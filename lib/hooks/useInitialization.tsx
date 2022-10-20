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
import { getMediaData, setLastVolumeCheck, setMediaData } from '../firebase/db';
import hasNewerVolume from '../googleBooks/api';
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

        if (
          !userData.lastVolumeCheck ||
          new Date(userData.lastVolumeCheck).toDateString() !==
            new Date().toDateString()
        ) {
          await Promise.allSettled([
            ...(lists.waiting?.map((w, i) =>
              (async () => {
                lists.waiting![i].hasNewVolume = await hasNewerVolume(w);
                await setMediaData(firebaseUser!.uid, w.mediaId, {
                  hasNewVolume: lists.waiting![i].hasNewVolume
                });
              })()
            ) ?? []),
            ...(lists.current?.map((c, i) =>
              (async () => {
                lists.current![i].hasNewVolume = await hasNewerVolume(c);
                await setMediaData(firebaseUser!.uid, c.mediaId, {
                  hasNewVolume: lists.current![i].hasNewVolume
                });
              })()
            ) ?? [])
          ]);

          await setLastVolumeCheck(firebaseUser!.uid);
        }

        setMediaLists(lists);

        setNavigationProgress(100);
        setTimeout(() => resetNavigationProgress(), 400);
      })();
    }
  }, [userData?.onboardingDone, isVisible]);

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
