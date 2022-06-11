import { useState } from 'react';
import { setMediaData } from '../firebase/db';
import { IMediaData } from '../types/entry';
import { IFirebaseValues } from '../types/firebase';
import useNotification from './useNotification';
import { useUser } from './provider/userProvider';

const useFirebaseData = (mediaEntry: IMediaData) => {
  const { firebaseUser } = useUser();
  const [firebaseData, setFirebaseData] = useState<IFirebaseValues>({
    notes: mediaEntry.notes ?? '',
    preordered: mediaEntry.preordered ?? mediaEntry.progressVolumes
  });
  const { showSuccess } = useNotification();

  const updateFirebaseData = async (values: IFirebaseValues) => {
    Object.keys(values).forEach(key => {
      if (values[key as keyof typeof values] === undefined)
        delete values[key as keyof typeof values];
    });

    if (!Object.keys(values).length) return;

    await setMediaData(firebaseUser!.uid, mediaEntry.mediaId, values);
    setFirebaseData(prev => ({ ...prev, ...values }));
  };

  const updatePreordered = async (preordered: number) => {
    if (preordered === firebaseData.preordered) return;
    await updateFirebaseData({ preordered });
    showSuccess(`${mediaEntry.media.title.userPreferred} entry updated`);
  };

  return { firebaseData, updateFirebaseData, updatePreordered };
};

export default useFirebaseData;
