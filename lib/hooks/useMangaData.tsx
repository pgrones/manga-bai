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
import mediaQuery, {
  MediaList,
  MediaQueryData
} from '../../apollo/queries/mediaQuery';
import useNotification from './useNotification';
import { useUser } from './userProvider';
import test from '../../apollo/test.json';

const testData = (test as any).data.MediaListCollection.lists.reduce(
  (p: any, c: any) => [...p, ...c.entries],
  []
);

export interface MangaData {
  current: MediaList[] | undefined;
  paused: MediaList[] | undefined;
  waiting: MediaList[] | undefined;
  hasCustomList: boolean;
}

const WAITING = 'Waiting For New Volumes';

const createMangaLists = (
  mediaData?: MediaQueryData,
  customListsData?: CustomListQueryData
) => {
  return {
    current: mediaData?.Page.mediaList.filter(m => m.status === 'CURRENT'),
    paused: mediaData?.Page.mediaList.filter(m => m.status === 'PAUSED'),
    waiting: mediaData?.Page.mediaList.filter(m => m.customLists[WAITING]),
    hasCustomList:
      !!customListsData?.User.mediaListOptions.mangaList.customLists.includes(
        WAITING
      )
  } as MangaData;
};

const useMangaData = () => {
  const { showError } = useNotification();
  const { aniListUser } = useUser();
  const [otherError, setOtherError] = useState(false);
  const [manga, setManga] = useState<MangaData>();

  const {
    data: mediaData,
    loading,
    error,
    refetch
    //fetchMore
  } = useQuery<MediaQueryData>(mediaQuery, {
    variables: { userId: aniListUser?.id },
    skip: !aniListUser
  });

  const {
    data: customListsData,
    loading: customListsLoading,
    error: customListsError
  } = useQuery<CustomListQueryData>(customListQuery, {
    variables: { id: aniListUser?.id },
    skip: !aniListUser
  });

  const [createList, { loading: createLoading, error: createError }] =
    useMutation<any, CreateCustomListVariables>(createCustomList, {
      ignoreResults: true
    });

  const [fillList, { loading: fillLoading, error: fillError }] = useMutation<
    any,
    UpdateMangaEntryVariables
  >(updateMangaEntry, { ignoreResults: true });

  useEffect(() => {
    if (customListsData && mediaData) {
      const managaData = createMangaLists(mediaData, customListsData);
      if (!managaData.hasCustomList) {
        (async () => {
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

            await Promise.allSettled(
              (managaData.paused || []).map(entry =>
                fillList({
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

            setManga(createMangaLists((await refetch()).data, customListsData));
          } catch (error) {
            setOtherError(true);
          }
        })();
      } else {
        setManga(managaData);
      }
    }
  }, [customListsData, mediaData]);

  useEffect(() => {
    if (error || createError || customListsError) showError();
  }, [error, createError, customListsError]);

  return {
    manga,
    loading: loading || customListsLoading || createLoading || fillLoading,
    error: error || createError || customListsError || fillError || otherError
  };
};

export default useMangaData;
