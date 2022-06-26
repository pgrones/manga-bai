import { MediaListQueryData } from '../../apollo/queries/mediaListQuery';
import { IMediaData, IMediaLists } from '../types/entry';
import { IFirebaseValues } from '../types/firebase';
import { WAITING_CUSTOM_LIST } from './constants';

export const isCurrentMedia = (m: IMediaData) =>
  m.status === 'CURRENT' && !m.customLists?.[WAITING_CUSTOM_LIST];

export const isWaitingMedia = (m: IMediaData) =>
  m.customLists?.[WAITING_CUSTOM_LIST] ?? false;

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
