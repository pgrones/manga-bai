import { useMutation } from '@apollo/client';
import { Button, Progress, Stack, Switch, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import updateCustomLists, {
  UpdateCustomListsVariables
} from '../../apollo/mutations/updateCustomLists';
import updateMangaEntry, {
  UpdateMangaEntryVariables
} from '../../apollo/mutations/updateMangaEntry';
import { WAITING, WAITING_CUSTOM_LIST } from '../../lib/helper/constants';
import { createMediaLists, createMutation } from '../../lib/helper/customList';
import { useOnboarding } from '../../lib/hooks/provider/onboardingProvider';
import useNotification from '../../lib/hooks/useNotification';

const CreateCustomListStep = () => {
  const {
    mediaData,
    setMediaLists,
    customLists,
    loading,
    setLoading,
    nextStep
  } = useOnboarding();
  const { showError } = useNotification();
  const [createCustomList, setCreateCustomList] = useState(true);
  const [importPaused, setImportPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const [ratio, setRatio] = useState<string>();
  const [hasManyEntries, setHasManyEntries] = useState(false);

  // Create the custom list "Waiting For New Volumes" on AniList
  const [updateLists, { error }] = useMutation<
    unknown,
    UpdateCustomListsVariables
  >(updateCustomLists, {
    ignoreResults: true
  });

  // Update an entry in the custom list "Waiting For New Volumes" on AniList
  const [updateEntry, { error: fillError }] = useMutation<
    unknown,
    UpdateMangaEntryVariables
  >(updateMangaEntry, { ignoreResults: true });

  useEffect(() => {
    if (error || fillError) {
      setLoading(false);
      showError(error, 'Unable to create custom list');
    }
  }, [error, fillError]);

  const next = async () => {
    setLoading(true);
    // Group the data by status
    const mangaLists = createMediaLists(mediaData, customLists);

    if (createCustomList) {
      if (!mangaLists.hasCustomList) {
        await updateLists({
          variables: {
            customLists: Array.from(
              new Set([...(customLists ?? []), WAITING_CUSTOM_LIST])
            )
          }
        });
      }

      if (importPaused) {
        const onMutation = async (options: any) => {
          await updateEntry(options);
          setProgress(prev => prev + 100 / (mangaLists.paused ?? []).length);
          setRatio(
            prev =>
              `${!prev ? 1 : parseInt(prev.split('/')[0]) + 1}/${
                (mangaLists.paused ?? []).length
              }`
          );
        };

        const chunks: Promise<void>[] = [];
        const itemsPerMinute = 75;

        if ((mangaLists.paused ?? []).length <= itemsPerMinute) {
          chunks.push(
            ...createMutation(mangaLists.paused ?? [], 200, onMutation)
          );
        } else {
          setHasManyEntries(true);
          const timeUntilNextMinute = (60 - new Date().getSeconds()) * 1000;

          let requestsPossibleInFirstMinute = Math.min(
            itemsPerMinute,
            (timeUntilNextMinute - 1000) / 205
          );
          if (requestsPossibleInFirstMinute < 0)
            requestsPossibleInFirstMinute = 0;

          const delayInFirstMinute =
            timeUntilNextMinute / requestsPossibleInFirstMinute;

          const firstChunk = (mangaLists.paused ?? []).slice(
            0,
            requestsPossibleInFirstMinute
          );
          const remainingChunks = (mangaLists.paused ?? []).slice(
            requestsPossibleInFirstMinute
          );

          chunks.push(
            ...createMutation(
              firstChunk,
              delayInFirstMinute,
              onMutation,
              undefined,
              'firstChunk'
            )
          );

          for (let i = 0; i < remainingChunks.length; i += itemsPerMinute) {
            const lastChunk = i + itemsPerMinute >= remainingChunks.length;
            const chunk = remainingChunks.slice(i, i + itemsPerMinute);
            const chunkDelay =
              timeUntilNextMinute + (60 * 1000 * i) / itemsPerMinute;

            chunks.push(
              ...createMutation(
                chunk,
                lastChunk ? 200 : 760,
                onMutation,
                chunkDelay,
                'chunk ' + (i + itemsPerMinute) / itemsPerMinute
              )
            );
          }
        }

        await Promise.allSettled(chunks);

        mangaLists.waiting = mangaLists.paused;
      }
    }

    if (!error && !fillError) {
      setMediaLists(mangaLists);
      setLoading(false);
      nextStep();
    }
  };

  return (
    <Stack py="xl" align="flex-start">
      <Text>
        Manga Bai creates a custom list called &quot;{WAITING}&quot; on AniList
        to keep track of all the entries that don&apos;t have a next volume yet.
        If you don&apos;t want to create this list, Manga Bai will only track
        entries you&apos;re currently reading.
      </Text>
      <Switch
        label={`Create the custom list "${WAITING}"`}
        checked={createCustomList}
        onChange={e => {
          const value = e.currentTarget.checked;
          setCreateCustomList(value);
          if (!value) setImportPaused(false);
        }}
        disabled={loading}
      />
      <Text pt="xl">
        Manga Bai imports all of your paused entries into &quot;{WAITING}
        &quot;. If you don&apos;t want to import those entries, you&apos;ll have
        to populate the list yourself on AniList.
      </Text>
      <Switch
        label={`Import paused entries into "${WAITING}"`}
        checked={importPaused}
        onChange={e => setImportPaused(e.currentTarget.checked)}
        disabled={loading || !createCustomList}
      />
      {progress ? (
        <div style={{ alignSelf: 'stretch' }}>
          <Text mt="xl" mb="xs">
            Importing paused entries {ratio}
          </Text>
          <Progress aria-label="Import progress" value={progress} />
          <Text mt="xs" size="sm">
            {hasManyEntries && (
              <>
                Woah, those are a lot of paused entries!
                <br />
              </>
            )}
            Please be patient. AniList&apos;s server only allows up to 90
            updates per minute. No worries, you&apos;ll only need to endure this
            once.
          </Text>
        </div>
      ) : (
        <Button mt="xl" onClick={next} loading={loading}>
          Next
        </Button>
      )}
    </Stack>
  );
};

export default CreateCustomListStep;
