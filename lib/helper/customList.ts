import { MediaQueryData } from '../../apollo/queries/mediaQuery';
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
