import { MediaList, MediaQueryData } from '../../apollo/queries/mediaQuery';
import { IMediaLists } from '../types/entry';
import { IFirebaseValues } from '../types/firebase';
import { WAITING_CUSTOM_LIST } from './constants';

export const createMediaLists = (
  mediaData?: MediaQueryData,
  customLists?: string[],
  firebaseData?: { [key: number]: IFirebaseValues } | null
): IMediaLists => {
  const mediaLists = mediaData?.MediaListCollection.lists;

  return {
    paused: mediaLists?.find(l => l.entries?.some(e => e.status === 'PAUSED'))
      ?.entries,
    current: mediaLists
      ?.find(l => l.entries?.some(e => e.status === 'CURRENT'))
      ?.entries?.map(m => ({ ...m, ...firebaseData?.[m.mediaId] })),
    waiting: mediaLists
      ?.find(l => l.entries?.every(e => e.customLists?.[WAITING_CUSTOM_LIST]))
      ?.entries?.map(m => ({ ...m, ...firebaseData?.[m.mediaId] })),
    hasCustomList: !!customLists?.includes(WAITING_CUSTOM_LIST)
  };
};

export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const createMutation = (
  chunk: MediaList[],
  ms: number,
  onMutation: (options: any) => Promise<void>,
  chunkDelay?: number,
  c?: string
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

    console.log(
      'delay: ' + Math.round(ms + Math.random() * 10),
      '| length: ' + chunk.length,
      '| chunk: ' + c + ' - ' + i
    );
  });
};
