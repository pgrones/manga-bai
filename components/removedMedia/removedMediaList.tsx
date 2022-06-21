import { useLazyQuery, useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Center,
  Group,
  Paper,
  Popover,
  Stack,
  Text,
  useMantineTheme
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { IoArrowBackOutline, IoChevronDownOutline } from 'react-icons/io5';
import { areEqual, FixedSizeList as List } from 'react-window';
//@ts-ignore
import { ReactWindowScroller } from 'react-window-scroller';
import updateMangaEntry, {
  UpdateMangaEntryVariables
} from '../../apollo/mutations/updateMangaEntry';
import mediaQuery, {
  MediaQueryData,
  MediaQueryVariables
} from '../../apollo/queries/mediaQuery';
import removedMediaQuery, {
  Media,
  RemovedMediaQueryData,
  RemovedMediaQueryVariables,
  Title
} from '../../apollo/queries/removedMediaQuery';
import { getMediaData, setMediaData } from '../../lib/firebase/db';
import {
  CURRENT,
  WAITING,
  WAITING_CUSTOM_LIST
} from '../../lib/helper/constants';
import { getBorderRadius } from '../../lib/helper/radius';
import { useUser } from '../../lib/hooks/provider/userProvider';
import useNotification from '../../lib/hooks/useNotification';
import LoadingIndicator from '../common/loadingIndicator';
import SearchInput from '../home/toolbar/searchInput';

const titles: (keyof Title)[] = ['romaji', 'english', 'native'];

const Row: React.FC<{
  data: (Media & { undoRemoval: (waiting: boolean) => void })[];
  index: number;
  style: React.CSSProperties;
}> = React.memo(({ data, index, style }) => {
  const {
    coverImage,
    title,
    id,
    undoRemoval
  }: Media & { undoRemoval: (waiting: boolean) => void } = data[index];
  const theme = useMantineTheme();
  const borderRadius = getBorderRadius(theme).borderRadius;
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <div style={style}>
      <Group px="md" spacing="xl" position="center" style={{ height: 55 }}>
        <div
          style={{
            position: 'relative',
            height: 40,
            minHeight: 40,
            maxWidth: 40,
            minWidth: 40,
            flex: 1,
            borderRadius
          }}
        >
          <Image
            layout="fill"
            objectFit="cover"
            src={coverImage.large}
            alt={title.userPreferred}
            style={{ borderRadius }}
            sizes="40px"
          />
        </div>

        <div style={{ flex: 3 }}>
          <div style={{ display: 'table' }}>
            <Text
              title="Open this entry on AniList"
              component="a"
              referrerPolicy="no-referrer"
              target="_blank"
              href={`https://anilist.co/manga/${id}`}
              lineClamp={2}
              style={{ wordBreak: 'break-word', fontSize: 15 }}
            >
              {title.userPreferred}
            </Text>
          </div>
        </div>
        <Popover
          opened={opened}
          onClose={close}
          transition="scale-y"
          target={
            <Button
              size="xs"
              variant="light"
              title="Undo Removal"
              onClick={toggle}
              rightIcon={<IoChevronDownOutline size={18} />}
            >
              Undo Removal
            </Button>
          }
          styles={{ inner: { padding: '10px 0 5px 0' } }}
          position="bottom"
          withArrow
        >
          <Stack spacing={0}>
            <Text px={18} pb={5} size="sm">
              Put this entry back into
            </Text>
            <Button
              variant="subtle"
              color="gray"
              onClick={() => undoRemoval(true)}
              styles={{ inner: { justifyContent: 'flex-start' } }}
            >
              {WAITING}
            </Button>
            <Button
              variant="subtle"
              color="gray"
              onClick={() => undoRemoval(false)}
              styles={{ inner: { justifyContent: 'flex-start' } }}
            >
              {CURRENT}
            </Button>
          </Stack>
        </Popover>
      </Group>
    </div>
  );
}, areEqual);

const RemovedMediaList = () => {
  const theme = useMantineTheme();
  const { firebaseUser, aniListUser } = useUser();
  const { showError } = useNotification();
  const fullData = useRef<
    (Media & { undoRemoval: (waiting: boolean) => void })[] | undefined
  >();
  const [removedMedia, setRemovedMedia] = useState<
    (Media & { undoRemoval: (waiting: boolean) => void })[] | 'loading'
  >('loading');

  const [getRemovedMedia, { error, fetchMore }] = useLazyQuery<
    RemovedMediaQueryData,
    RemovedMediaQueryVariables
  >(removedMediaQuery);

  const [getMedia, { error: mediaError }] = useLazyQuery<
    MediaQueryData,
    MediaQueryVariables
  >(mediaQuery);

  // Update an entry in the custom list "Waiting For New Volumes" on AniList
  const [updateEntry, { error: fillError }] = useMutation<
    unknown,
    UpdateMangaEntryVariables
  >(updateMangaEntry, { ignoreResults: true });

  useEffect(() => {
    if (firebaseUser) {
      (async () => {
        const media = await getMediaData(firebaseUser.uid);
        if (media) {
          const removedMediaIds = Object.entries(media)
            .filter(m => m[1].removed)
            .map(m => parseInt(m[0]));

          const { data: firstFetchData } = await getRemovedMedia({
            variables: { ids: removedMediaIds, page: 1 }
          });

          let removedMediaData: Media[] = firstFetchData?.Page.media ?? [];

          let hasNext = firstFetchData?.Page.pageInfo.hasNextPage;
          let page = 2;
          while (hasNext) {
            const { data: moreFetchData } = await fetchMore({
              variables: { ids: removedMediaIds, page }
            });

            page++;
            hasNext = moreFetchData?.Page.pageInfo.hasNextPage;

            if (hasNext)
              removedMediaData = [
                ...removedMediaData,
                ...moreFetchData.Page.media
              ];
          }

          setRemovedMedia(
            removedMediaData.map(r => ({
              ...r,
              undoRemoval: (waiting: boolean) => undoRemoval(r.id, waiting)
            }))
          );
        }
      })();
    }
  }, [firebaseUser]);

  useEffect(() => {
    if (error || fillError || mediaError)
      showError(error || fillError || mediaError);
  }, [error, fillError, mediaError]);

  const undoRemoval = async (mediaId: number, waiting: boolean) => {
    await setMediaData(firebaseUser!.uid, mediaId, { removed: false });
    const { data } = await getMedia({
      variables: { mediaId, userId: aniListUser!.id }
    });

    await updateEntry({
      variables: {
        mediaId: mediaId,
        status: waiting ? 'PAUSED' : 'CURRENT',
        ...(waiting
          ? {
              customLists: Array.from(
                new Set([
                  ...Object.entries(data?.MediaList.customLists ?? [])
                    .filter(o => o[1] === true)
                    .map(o => o[0]),
                  WAITING_CUSTOM_LIST
                ])
              )
            }
          : {})
      }
    });

    setRemovedMedia(prev =>
      (prev === 'loading' ? [] : prev).filter(m => m.id !== mediaId)
    );
    fullData.current?.splice(
      fullData.current?.findIndex(m => m.id === mediaId),
      1
    );
  };

  const search = (value: string) => {
    value = value.trim().toLowerCase();
    if (!value && !fullData.current) return;

    if (!value && fullData.current) {
      setRemovedMedia(fullData.current);
      fullData.current = undefined;
      return;
    }

    if (!fullData.current)
      fullData.current = removedMedia as (Media & {
        undoRemoval: () => void;
      })[];

    setRemovedMedia(
      fullData.current?.filter(c =>
        titles.some(t => c.title[t]?.toLowerCase().includes(value))
      )
    );
  };

  return removedMedia === 'loading' ? (
    <LoadingIndicator />
  ) : removedMedia ? (
    <div>
      <Group position="apart" pb="md">
        <Link href="/home" passHref>
          <Button component="a" size="xs" variant="default">
            <Center inline>
              <IoArrowBackOutline />
              <Box ml={5}>Home</Box>
            </Center>
          </Button>
        </Link>
        <SearchInput searchFn={search} />
      </Group>
      {(removedMedia.length || null) && (
        <ReactWindowScroller>
          {({ ref, outerRef, style, onScroll }: any) => (
            <Paper pt={6} withBorder={theme.colorScheme === 'light'}>
              <List
                ref={ref}
                outerRef={outerRef}
                style={style}
                height={window.innerHeight}
                itemCount={removedMedia.length}
                itemSize={55}
                width={0}
                itemData={removedMedia}
                onScroll={onScroll}
              >
                {Row}
              </List>
            </Paper>
          )}
        </ReactWindowScroller>
      )}
    </div>
  ) : null;
};

export default RemovedMediaList;
