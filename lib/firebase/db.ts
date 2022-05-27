import { onValue, ref, update } from 'firebase/database';
import { db } from './firebase';

/**
 *  Writes the data to the corresponding uid (user)
 */
export const setUserData = async (id: string, data: object) => {
  update(ref(db, id + '/user'), data);
};

/**
 *
 */
export const getUserData = (id: string, onChange: (data: any) => void) => {
  const userRef = ref(db, id + '/user');
  return onValue(userRef, snapshot => {
    const data = snapshot.val();
    onChange(data);
  });
};
