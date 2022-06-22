import { useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import customListQuery, {
  CustomListQueryData,
  CustomListQueryVariables
} from '../../apollo/queries/customListQuery';
import mediaListQuery, {
  MediaListQueryData,
  MediaListQueryVariables
} from '../../apollo/queries/mediaListQuery';
import { getMediaData } from '../firebase/db';
import { createMediaLists } from '../helper/onboardingHelper';
import { IMediaLists } from '../types/entry';
import { useUser } from './provider/userProvider';
import useNotification from './useNotification';

const useInitialization = (
  setMediaLists: React.Dispatch<React.SetStateAction<IMediaLists | undefined>>
) => {
  const { userData, aniListUser, firebaseUser } = useUser();
  const { showError } = useNotification();

  // Query for all the paused and current media of a user
  const {
    data: mediaData,
    loading,
    error
  } = useQuery<MediaListQueryData, MediaListQueryVariables>(mediaListQuery, {
    variables: { userId: aniListUser!.id },
    skip: !aniListUser
  });

  // Query for all custom lists of a user
  const {
    data: customListsData,
    loading: customListsLoading,
    error: customListsError
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
    if (userData?.onboardingDone && mediaData && customListsData) {
      (async () => {
        const firebaseData = await getMediaData(firebaseUser!.uid);
        setMediaLists(
          createMediaLists(
            mediaData,
            customListsData?.User.mediaListOptions.mangaList.customLists,
            firebaseData
          )
        );
      })();
    }
  }, [userData?.onboardingDone, mediaData, customListsData]);

  return {
    firebaseUser,
    onboardingDone: userData?.onboardingDone,
    mediaData,
    customLists: customListsData?.User.mediaListOptions.mangaList.customLists,
    loading: loading || customListsLoading || userData === undefined,
    error: error || customListsError
  };
};

export default useInitialization;
