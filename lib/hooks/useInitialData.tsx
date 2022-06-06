import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import createCustomList, {
  CreateCustomListVariables
} from '../../apollo/mutations/createCustomList';
import updateMangaEntry, {
  UpdateMangaEntryVariables
} from '../../apollo/mutations/updateMangaEntry';
import customListQuery, {
  CustomListQueryData
} from '../../apollo/queries/customListQuery';
import mediaQuery, { MediaQueryData } from '../../apollo/queries/mediaQuery';
import { getMediaData } from '../firebase/db';
import { IMediaLists } from '../types/entry';
import { IFirebaseValues } from '../types/firebase';
import useNotification from './useNotification';
import { useUser } from './userProvider';

const WAITING = 'Waiting For New Volumes';

const createMangaLists = (
  mediaData?: MediaQueryData,
  customListsData?: CustomListQueryData,
  firebaseData?: { [key: number]: IFirebaseValues } | null
): IMediaLists => {
  const mediaLists = mediaData?.MediaListCollection.lists;

  return {
    paused: mediaLists?.find(l => l.entries.some(e => e.status === 'PAUSED'))
      ?.entries,
    current: mediaLists?.find(l => l.entries.some(e => e.status === 'CURRENT'))
      ?.entries,
    waiting: mediaLists
      ?.find(l => l.entries.every(e => e.customLists[WAITING]))
      ?.entries.map(m => ({ ...m, ...firebaseData?.[m.mediaId] })),
    hasCustomList:
      !!customListsData?.User.mediaListOptions.mangaList.customLists.includes(
        WAITING
      )
  };
};

const useInitialData = () => {
  const { showError } = useNotification();
  const { aniListUser, firebaseUser } = useUser();
  const [otherError, setOtherError] = useState(false);
  const [otherLoading, setOtherLoading] = useState(true);
  const [manga, setManga] = useState<IMediaLists>();

  // Query for all the paused and current media of a user
  const {
    data: mediaData,
    loading,
    error,
    refetch
  } = useQuery<MediaQueryData>(mediaQuery, {
    variables: { userId: aniListUser?.id },
    skip: !aniListUser
  });

  // Query for all custom lists of a user
  const {
    data: customListsData,
    loading: customListsLoading,
    error: customListsError
  } = useQuery<CustomListQueryData>(customListQuery, {
    variables: { id: aniListUser?.id },
    skip: !aniListUser
  });

  // Create the custom list "Waiting For New Volumes" on AniList
  const [createList, { loading: createLoading, error: createError }] =
    useMutation<any, CreateCustomListVariables>(createCustomList, {
      ignoreResults: true
    });

  // Update an entry in the custom list "Waiting For New Volumes" on AniList
  const [updateEntry, { loading: fillLoading, error: fillError }] = useMutation<
    any,
    UpdateMangaEntryVariables
  >(updateMangaEntry, { ignoreResults: true });

  useEffect(() => {
    // Wait for all the needed data
    if (customListsData && mediaData && firebaseUser) {
      (async () => {
        setOtherLoading(true);
        // Get data from firebase
        const firebaseData = await getMediaData(firebaseUser.uid);
        // Group the data by status
        const mangaData = createMangaLists(
          mediaData,
          customListsData,
          firebaseData
        );

        if (!mangaData.hasCustomList) {
          try {
            await createList({
              variables: {
                customLists: [
                  ...customListsData.User.mediaListOptions.mangaList
                    .customLists,
                  WAITING
                ]
              }
            });

            const result = await Promise.allSettled(
              (mangaData.paused || []).map(entry =>
                updateEntry({
                  variables: {
                    mediaId: entry.mediaId,
                    customLists: [
                      ...Object.keys(
                        Object.fromEntries(
                          Object.entries(entry.customLists).filter(
                            o => o[1] === true
                          )
                        )
                      ),
                      WAITING
                    ]
                  }
                })
              )
            );

            result.findIndex(r => r.status === 'rejected') > -1 &&
              showError(
                `Some entries could not be saved to the custom list "${WAITING}"`
              );

            setManga(createMangaLists((await refetch()).data, customListsData));
          } catch (error) {
            setOtherError(true);
          }
        } else {
          setManga(mangaData);
        }
        setOtherLoading(false);
      })();
    }
  }, [customListsData, mediaData, firebaseUser]);

  useEffect(() => {
    if (error || createError || customListsError) showError();
  }, [error, createError, customListsError]);

  return {
    manga,
    loading:
      loading ||
      customListsLoading ||
      createLoading ||
      fillLoading ||
      otherLoading,
    error: error || createError || customListsError || fillError || otherError
  };
};

export default useInitialData;
