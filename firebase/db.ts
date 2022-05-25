import { get, ref, set } from 'firebase/database';
import { db } from './firebaseConfig';

/**
 *  Writes the data to the corresponding uid (user)
 */
export const setUserData = async (id: string, data: object) => {
  set(ref(db, id + '/user'), data);
};

/**
 *  Writes the data to the corresponding uid (user)
 */
export const getUserData = async (id: string) => {
  const snapshot = await get(ref(db, id + '/user'));
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    console.log('No data available');
  }
};
