import { CSSProperties } from 'react';
import {
  MediaList,
  MediaListQueryData
} from '../../apollo/queries/mediaListQuery';
import { PopularMangaQueryData } from '../../apollo/queries/popularManga';
import { IMediaLists } from '../types/entry';
import { IFirebaseValues } from '../types/firebase';
import { WAITING_CUSTOM_LIST } from './constants';

export const createMediaLists = (
  mediaData?: MediaListQueryData,
  customLists?: string[],
  firebaseData?: { [key: number]: IFirebaseValues } | null
): IMediaLists => {
  const mediaLists = mediaData?.MediaListCollection.lists;
  const waiting = mediaLists
    ?.find(l => l.entries?.every(e => e.customLists?.[WAITING_CUSTOM_LIST]))
    ?.entries?.map(m => ({ ...m, ...firebaseData?.[m.mediaId] }))
    .filter(m => !m.removed);

  return {
    paused: mediaLists?.find(l => l.entries?.every(e => e.status === 'PAUSED'))
      ?.entries,
    current: mediaLists
      ?.find(l => l.entries?.every(e => e.status === 'CURRENT'))
      ?.entries?.map(m => ({ ...m, ...firebaseData?.[m.mediaId] }))
      .filter(
        m =>
          !m.removed && waiting?.findIndex(w => w.mediaId === m.mediaId) === -1
      ),
    waiting,
    hasCustomList: !!customLists?.includes(WAITING_CUSTOM_LIST)
  };
};

export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const createMutation = (
  chunk: MediaList[],
  ms: number,
  onMutation: (options: any) => Promise<void>,
  chunkDelay?: number
) => {
  return chunk.map(async (entry, i) => {
    await delay((chunkDelay ?? 0) + ms * i + Math.random() * 10);
    await onMutation({
      variables: {
        mediaId: entry.mediaId,
        customLists: Array.from(
          new Set([
            ...Object.entries(entry.customLists ?? [])
              .filter(o => o[1] === true)
              .map(o => o[0]),
            WAITING_CUSTOM_LIST
          ])
        )
      }
    });
  });
};

const isMediaQueryData = (
  data: MediaListQueryData | PopularMangaQueryData
): data is MediaListQueryData =>
  Object.prototype.hasOwnProperty.call(data, 'MediaListCollection');

export const getCovers = (
  mediaData: MediaListQueryData | PopularMangaQueryData | undefined
) => {
  if (mediaData) {
    let covers: { id: number; coverImage: string }[];

    if (isMediaQueryData(mediaData)) {
      const { current = [], paused = [] } = createMediaLists(mediaData);

      const currentCovers = current
        .slice(
          0,
          (current.length >= 3 ? 3 : current.length) +
            (paused.length === 0 ? 1 : 0)
        )
        .map(c => ({
          id: c.mediaId,
          coverImage: c.media.coverImage.extraLarge
        }));
      const pausedCovers = paused.slice(0, 4 - currentCovers.length).map(c => ({
        id: c.mediaId,
        coverImage: c.media.coverImage.extraLarge
      }));
      covers = [...pausedCovers, ...currentCovers.reverse()];
    } else {
      covers = mediaData.Page.media.map(m => ({
        id: m.id,
        coverImage: m.coverImage.extraLarge
      }));
    }

    return covers.map((c, i) => ({
      id: c.id,
      coverImage: c.coverImage,
      style: {
        transform: `rotate(${i * 12}deg) translateY(${11 * i * (i + 1)}px)`,
        marginLeft: (i + 1) * 100
      } as CSSProperties
    }));
  }
};
