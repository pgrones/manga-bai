import { setMediaData } from '../firebase/db';
import enqueueNewVolumeCheck from '../googleBooks/api';
import { IMediaData } from '../types/entry';
import { IFirebaseValues } from '../types/firebase';
import { useMedia } from './provider/mediaProvider';
import { useUser } from './provider/userProvider';

const useFirebaseData = (entry: IMediaData) => {
  const { updateEntry } = useMedia();
  const { firebaseUser } = useUser();

  const updateFirebaseData = async (
    values: IFirebaseValues,
    checkForNewVolumes?: boolean
  ) => {
    Object.keys(values).forEach(key => {
      if (values[key as keyof typeof values] === undefined)
        delete values[key as keyof typeof values];
    });

    if (!Object.keys(values).length) return;

    if (checkForNewVolumes) {
      enqueueNewVolumeCheck([{ ...entry, ...values }], (mediaId, result) => {
        updateEntry(mediaId, { hasNewVolume: result });
        setMediaData(
          firebaseUser!.uid,
          mediaId,
          { hasNewVolume: result },
          true
        );
      });
    }
    await setMediaData(firebaseUser!.uid, entry.mediaId, values);
    updateEntry(entry.mediaId, values);
  };

  return { firebaseData: entry, updateFirebaseData };
};

export default useFirebaseData;
