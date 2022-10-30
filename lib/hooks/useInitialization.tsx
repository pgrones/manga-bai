import { useQuery } from '@apollo/client';
import {
  resetNavigationProgress,
  setNavigationProgress,
  startNavigationProgress
} from '@mantine/nprogress';
import { useEffect, useState, useSyncExternalStore } from 'react';
import customListQuery, {
  CustomListQueryData,
  CustomListQueryVariables
} from '../../apollo/queries/customListQuery';
import mediaListQuery, {
  MediaListQueryData,
  MediaListQueryVariables
} from '../../apollo/queries/mediaListQuery';
import { getMediaData, setMediaData } from '../firebase/db';
import enqueueNewVolumeCheck from '../googleBooks/api';
import { createMediaLists } from '../helper/mediaHelper';
import { IMediaLists } from '../types/entry';
import { useUser } from './provider/userProvider';
import useNotification from './useNotification';

const subscribe = (callback: () => void) => {
  document.addEventListener('visibilitychange', callback);

  return () => document.removeEventListener('visibilitychange', callback);
};

const useVisibilityState = () => {
  return useSyncExternalStore(
    subscribe,
    () => document.visibilityState === 'visible',
    () => true
  );
};

const useInitialization = () => {
  const { userData, aniListUser, firebaseUser } = useUser();
  const { showError } = useNotification();
  const [mediaLists, setMediaLists] = useState<IMediaLists>();
  const isVisible = useVisibilityState();

  // Query for all the paused and current media of a user
  const {
    data: mediaData,
    loading,
    error,
    refetch
  } = useQuery<MediaListQueryData, MediaListQueryVariables>(mediaListQuery, {
    variables: { userId: aniListUser!.id },
    skip: !aniListUser
  });

  // Query for all custom lists of a user
  const {
    data: customListsData,
    loading: customListsLoading,
    error: customListsError,
    refetch: refetchCustomLists
  } = useQuery<CustomListQueryData, CustomListQueryVariables>(customListQuery, {
    variables: { id: aniListUser!.id },
    skip: !aniListUser
  });

  useEffect(() => {
    (error || customListsError) &&
      showError(
        error ?? customListsError,
        'Unable to retrieve data from AniList'
      );
  }, [error, customListsError]);

  useEffect(() => {
    if (userData?.onboardingDone && isVisible) {
      (async () => {
        startNavigationProgress();
        const firebaseData = await getMediaData(firebaseUser!.uid);
        const mediaData = (await refetch()).data;
        const customListsData = (await refetchCustomLists()).data;

        const lists = createMediaLists(
          mediaData,
          customListsData?.User.mediaListOptions.mangaList.customLists,
          firebaseData
        );

        if (!userData.volumeCheckDisabled) {
          enqueueNewVolumeCheck(
            lists.waiting?.filter(
              w =>
                w.hasNewVolume === undefined ||
                !w.lastVolumeCheck ||
                (new Date(w.lastVolumeCheck).toDateString() !==
                  new Date().toDateString() &&
                  !w.hasNewVolume)
            ) ?? [],
            (mediaId, result) => {
              setMediaLists(prev => {
                if (!prev?.waiting) return prev;

                const copy = { ...prev };

                copy.waiting![
                  copy.waiting!.findIndex(c => c.mediaId === mediaId)!
                ].hasNewVolume = result;

                return copy;
              });

              setMediaData(
                firebaseUser!.uid,
                mediaId,
                {
                  hasNewVolume: result
                },
                true
              );
            }
          );

          enqueueNewVolumeCheck(
            lists.current?.filter(
              c =>
                c.hasNewVolume === undefined ||
                !c.lastVolumeCheck ||
                (new Date(c.lastVolumeCheck).toDateString() !==
                  new Date().toDateString() &&
                  !c.hasNewVolume)
            ) ?? [],
            (mediaId, result) => {
              setMediaLists(prev => {
                if (!prev?.current) return prev;

                const copy = { ...prev };

                copy.current![
                  copy.current!.findIndex(c => c.mediaId === mediaId)!
                ].hasNewVolume = result;

                return copy;
              });
              setMediaData(
                firebaseUser!.uid,
                mediaId,
                {
                  hasNewVolume: result
                },
                true
              );
            }
          );
        }

        setMediaLists(lists);
        setNavigationProgress(100);
        setTimeout(() => resetNavigationProgress(), 400);
      })();
    }
  }, [userData?.onboardingDone, isVisible, userData?.volumeCheckDisabled]);

  return {
    firebaseUser,
    onboardingDone: userData?.onboardingDone,
    mediaData,
    customLists: customListsData?.User.mediaListOptions.mangaList.customLists,
    loading: loading || customListsLoading || userData === undefined,
    error: error || customListsError,
    mediaLists
  };
};

export default useInitialization;
