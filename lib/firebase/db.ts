import { get, onValue, ref, update } from 'firebase/database';
import { IUserData } from '../hooks/provider/userProviderTypes';
import { IFirebaseValues } from '../types/firebase';
import { db } from './firebase';

/**
 *  Writes the data to the corresponding uid (user)
 */
export const setUserData = async (uid: string, userData: IUserData) => {
  update(ref(db, uid + '/user'), userData);
};

/**
 *
 */
export const getUserData = (uid: string, onChange: (data: any) => void) => {
  const userRef = ref(db, uid + '/user');
  return onValue(userRef, snapshot => {
    const data = snapshot.val();
    onChange(data);
  });
};

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
