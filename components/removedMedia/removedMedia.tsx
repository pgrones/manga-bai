import { Paper, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Media } from '../../apollo/queries/removedMediaQuery';
import { getMediaData, setMediaData } from '../../lib/firebase/db';
import { titles, WAITING_CUSTOM_LIST } from '../../lib/helper/constants';
import { useUser } from '../../lib/hooks/provider/userProvider';
import useNotification from '../../lib/hooks/useNotification';
import useRemovedMedia from '../../lib/hooks/useRemovedMedia';
import LoadingIndicator from '../common/loadingIndicator';
import RemovedMediaList from './removedMediaList';
import { RemovedMediaEntry, RemovedMediaState } from './removedMediaTypes';
import Toolbar from './toolbar';

const RemovedMedia = () => {
  const { showError } = useNotification();
  const { getRemovedMedia, fetchMore, getMedia, updateEntry, error } =
    useRemovedMedia();
  const [removedMedia, setRemovedMedia] =
    useState<RemovedMediaState>('loading');
  const { firebaseUser, aniListUser } = useUser();
  const theme = useMantineTheme();

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
  };

  const search = (value: string) => {
    if (removedMedia === 'loading') return;

    value = value.trim().toLowerCase();
    if (!value && !removedMedia.some(m => m.hidden)) return;

    if (!value && removedMedia.some(m => m.hidden)) {
      setRemovedMedia(prev =>
        (prev as RemovedMediaEntry[]).map(m => ({ ...m, hidden: undefined }))
      );
      return;
    }

    setRemovedMedia(prev =>
      (prev as RemovedMediaEntry[]).map(m => ({
        ...m,
        hidden: !titles.some(t => m.title[t]?.toLowerCase().includes(value))
      }))
    );
  };

  useEffect(() => {
    if (error) showError(error);
  }, [error]);

  return removedMedia === 'loading' ? (
    <LoadingIndicator />
  ) : removedMedia ? (
    <>
      <Toolbar searchFn={search} />
      {removedMedia.length > 0 && (
        <Paper withBorder={theme.colorScheme === 'light'}>
          <RemovedMediaList removedMedia={removedMedia} />
        </Paper>
      )}
    </>
  ) : null;
};

export default RemovedMedia;
