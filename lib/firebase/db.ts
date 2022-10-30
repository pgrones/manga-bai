import {
  child,
  get,
  onValue,
  push,
  ref,
  serverTimestamp,
  update
} from 'firebase/database';
import { IUserData } from '../hooks/provider/userProviderTypes';
import { IFirebaseValues } from '../types/firebase';
import { db } from './firebase';

/**
 *  Writes the data to the corresponding uid (user)
 */
export const setUserData = async (
  uid: string,
  userData: Partial<IUserData>
) => {
  update(ref(db, uid + '/user'), userData);
};

export const setLastChangesCheck = async (uid: string) => {
  update(ref(db, uid + '/user'), { lastChangesCheck: serverTimestamp() });
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

export const setLastVolumeCheck = async (uid: string, mediaId: number) => {
  update(ref(db, uid + '/media/' + mediaId), {
    lastVolumeCheck: serverTimestamp()
  });
};

export const setMediaData = async (
  uid: string,
  mediaId: number,
  values: IFirebaseValues,
  volumeCheck?: boolean
) => {
  return update(ref(db, uid + '/media/' + mediaId), {
    ...values,
    ...(volumeCheck ? { lastVolumeCheck: serverTimestamp() } : {})
  });
};

export const getMediaData = async (
  uid: string
): Promise<{ [key: number]: IFirebaseValues } | null> => {
  return (await get(ref(db, uid + '/media'))).val();
};

export const hasRemovedMediaData = (
  uid: string,
  onChange: (hasRemovedMediaData: boolean) => void
) => {
  const mediaRef = ref(db, uid + '/media');
  return onValue(mediaRef, snapshot => {
    const data: { [key: number]: IFirebaseValues } | null = snapshot.val();
    if (data) onChange(Object.values(data).some(d => d.removed));
  });
};

export const logError = async (error: any) => {
  const key = push(child(ref(db), 'errors')).key;
  const payload = JSON.parse(
    JSON.stringify(error, Object.getOwnPropertyNames(error))
  );
  payload.timestamp = serverTimestamp();

  return update(ref(db, 'errors/' + key), payload);
};
