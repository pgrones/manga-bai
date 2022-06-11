import { useMutation } from '@apollo/client';
import { Button, Stack, Switch, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import updateCustomLists, {
  UpdateCustomListsVariables
} from '../../apollo/mutations/updateCustomLists';
import updateMangaEntry, {
  UpdateMangaEntryVariables
} from '../../apollo/mutations/updateMangaEntry';
import { WAITING, WAITING_CUSTOM_LIST } from '../../lib/helper/constants';
import { createMediaLists } from '../../lib/helper/customList';
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
        const test = [
          ...(mangaLists.paused ?? []),
          ...(mangaLists.paused ?? []),
          ...(mangaLists.paused ?? []),
          ...(mangaLists.paused ?? [])
        ];
        await Promise.allSettled(
          test.map(entry =>
            updateEntry({
              variables: {
                mediaId: entry.mediaId,
                customLists: Array.from(
                  new Set([
                    ...Object.entries(entry.customLists ?? [])
                      .filter(o => o[1] === true)
                      .map(o => o[0]),
                    WAITING_CUSTOM_LIST
                  ])
                )
              }
            })
          )
        );

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
      <Button mt="xl" onClick={next} loading={loading}>
        Next
      </Button>
    </Stack>
  );
};

export default CreateCustomListStep;
