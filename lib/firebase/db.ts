import { get, ref, update } from 'firebase/database';
import { IFirebaseValues } from '../types/firebase';
import { db } from './firebase';

export const setMediaData = async (
  uid: string,
  mediaId: number,
  values: IFirebaseValues
) => {
  update(ref(db, uid + '/media/' + mediaId), values);
};

export const getMediaData = async (
  uid: string
): Promise<{ [key: number]: IFirebaseValues } | null> => {
  return (await get(ref(db, uid + '/media'))).val();
};
