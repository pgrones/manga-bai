import { useMutation, useQuery } from '@apollo/client';
import { Anchor, Center, Grid, Loader, Text } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import customListMutation from '../apollo/mutations/customListMutation';
import fillCustomListMutation from '../apollo/mutations/fillCustomListMutation';
import customListQuery, {
  CustomListQueryData
} from '../apollo/queries/customListQuery';
import mediaQuery, {
  MediaList,
  MediaQueryData
} from '../apollo/queries/mediaQuery';
import Manga from '../components/manga';
import Layout from '../lib/layout';
import { useUser } from '../lib/userProvider';

interface MangaData {
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

const Home: NextPage = () => {
  const { showNotification } = useNotifications();
  const [user] = useUser();
  const [manga, setManga] = useState<MangaData>();

  const {
    data: mediaData,
    loading,
    error,
    refetch,
    fetchMore
  } = useQuery<MediaQueryData>(mediaQuery, {
    variables: { userId: user?.id },
    skip: !user
  });

  const {
    data: customListsData,
    loading: customListsLoading,
    error: customListsError
  } = useQuery<CustomListQueryData>(customListQuery, {
    variables: { id: user?.id },
    skip: !user
  });

  const [createList, { loading: createLoading, error: createError }] =
    useMutation(customListMutation, { ignoreResults: true });

  const [fillList, { loading: fillLoading, error: fillError }] = useMutation(
    fillCustomListMutation,
    { ignoreResults: true }
  );

  useEffect(() => {
    if (customListsData && mediaData) {
      const managaData = createMangaLists(mediaData, customListsData);
      if (!managaData.hasCustomList) {
        (async () => {
          await createList({
            variables: {
              customLists: [
                ...customListsData.User.mediaListOptions.mangaList.customLists,
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
        })();
      } else {
        setManga(managaData);
      }
    }
  }, [customListsData, mediaData]);

  useEffect(() => {
    if (error || createError || customListsError)
      showNotification({
        title: 'An Error Occured',
        message: (
          <Text>
            :( Try to reload the page. If that doesn&apos;t work contact me on{' '}
            <Anchor
              href="https://anilist.co/user/Alzariel/"
              target="_blank"
              referrerPolicy="no-referrer"
            >
              AniList
            </Anchor>
          </Text>
        ),
        color: 'red',
        autoClose: false
      });
  }, [error, createError, customListsError]);

  return (
    <Layout>
      {error || createError || customListsError || fillError ? null : loading ||
        customListsLoading ||
        createLoading ||
        fillLoading ? (
        <Center
          style={{
            height: 'calc(100vh - var(--mantine-header-height))',
            marginTop: 'var(--mantine-header-height)'
          }}
        >
          <Loader variant="bars" />
        </Center>
      ) : (
        <Grid>
          {manga?.current?.map(c => (
            <Grid.Col xs={12} md={6} lg={4} key={c.mediaId}>
              <Manga {...c} />
            </Grid.Col>
          ))}
          {manga?.waiting?.map(p => (
            <Grid.Col xs={12} md={6} lg={4} key={p.mediaId}>
              <Manga {...p} />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Layout>
  );
};

export default Home;
