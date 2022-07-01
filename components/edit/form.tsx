import {
  Anchor,
  Button,
  Grid,
  Group,
  NumberInput,
  Select,
  Text,
  Textarea
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useModals } from '@mantine/modals';
import { FC } from 'react';
import { CURRENT, WAITING } from '../../lib/helper/constants';
import { isWaitingMedia } from '../../lib/helper/mediaHelper';
import useNotification from '../../lib/hooks/useNotification';
import { FormProps } from './formTypes';

const Form: FC<FormProps> = props => {
  const {
    aniListData,
    firebaseData,
    updateAniListData,
    updateFirebaseData,
    removeFromList,
    removeEntry,
    close
  } = props;
  const { openConfirmModal, closeAll, closeModal } = useModals();
  const { showSuccess, showError } = useNotification();
  const { progressVolumes, status, progress, media } = aniListData;

  const form = useForm({
    initialValues: {
      progressVolumes,
      progress,
      status,
      notes: firebaseData?.notes ?? '',
      preordered: firebaseData?.preordered ?? progressVolumes
    }
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await Promise.all([
        updateAniListData({
          progress:
            values.progress === aniListData.progress
              ? undefined
              : values.progress,
          progressVolumes:
            values.progressVolumes === aniListData.progressVolumes
              ? undefined
              : values.progressVolumes,
          status:
            values.status === aniListData.status ? undefined : values.status
        }),
        updateFirebaseData({
          notes:
            values.notes === firebaseData?.notes ? undefined : values.notes,
          preordered:
            values.preordered === firebaseData?.preordered
              ? undefined
              : values.preordered
        })
      ]);

      showSuccess(`${media.title.userPreferred} entry updated`);
      close();
    } catch (error) {
      showError(error);
    }
  };

  const onExclude = () => {
    const id = openConfirmModal({
      title: 'Are you sure you want to remove this entry?',
      children: (
        <Text size="sm">
          {isWaitingMedia(aniListData)
            ? `This will remove the entry from the custom list "${WAITING}" on AniList and t`
            : 'T'}
          he entry will not show up on Manga Bai anymore.
          <br />
          <br />
          You can always undo this action in the settings in the top right
          corner.
        </Text>
      ),
      labels: { confirm: 'Remove', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          removeEntry(aniListData.mediaId);

          if (isWaitingMedia(aniListData)) {
            await removeFromList();
          }

          await updateFirebaseData({ removed: true });
          closeAll();
        } catch (error) {
          showError(error);
          closeModal(id);
        }
      },
      centered: true
    });
  };

  return (
    <form id="form" onSubmit={form.onSubmit(handleSubmit)}>
      <Grid mt="xl" pt="md" mb={5} gutter="xl" align="flex-end">
        <Grid.Col xs={6} sm={4}>
          <Select
            {...form.getInputProps('status')}
            variant="filled"
            label="Status"
            data={[
              { label: CURRENT, value: 'CURRENT' },
              { label: WAITING, value: 'PAUSED' }
            ]}
          />
        </Grid.Col>
        <Grid.Col xs={6} sm={4}>
          <NumberInput
            {...form.getInputProps('progressVolumes')}
            min={0}
            variant="filled"
            label="Volume Progress"
          />
        </Grid.Col>
        <Grid.Col xs={6} sm={4}>
          <NumberInput
            {...form.getInputProps('progress')}
            min={0}
            variant="filled"
            label="Chapter Progress"
          />
        </Grid.Col>
        <Grid.Col xs={6} sm={4}>
          <NumberInput
            {...form.getInputProps('preordered')}
            min={0}
            variant="filled"
            label="Preordered Up To"
            description="Preordered, bought or owned volumes"
            styles={{ description: { whiteSpace: 'nowrap' } }}
          />
        </Grid.Col>
        <Grid.Col xs={6} sm={4}>
          <Textarea
            {...form.getInputProps('notes')}
            autosize
            minRows={1}
            maxRows={4}
            styles={{
              input: {
                paddingTop: 6 + 'px !important',
                paddingBottom: 6 + 'px !important'
              }
            }}
            variant="filled"
            label="Notes"
            description="These will not be visible on AniList"
            placeholder="Links, Prices, etc."
          />
        </Grid.Col>
        <Grid.Col xs={6} sm={4}>
          <Group position="right">
            <Anchor
              size="sm"
              href={media.siteUrl}
              referrerPolicy="no-referrer"
              target="_blank"
              title="Open this entry on AniList"
            >
              AniList
            </Anchor>
            <Button
              variant="subtle"
              title="Remove this entry from Manga Bai"
              onClick={onExclude}
              sx={theme => ({
                'color':
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[2]
                    : theme.colors.gray[6],
                '&:hover': {
                  backgroundColor: theme.colors.red[8],
                  color: theme.white
                }
              })}
            >
              Remove
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default Form;
