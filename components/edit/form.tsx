import {
  Anchor,
  Button,
  Grid,
  Group,
  NumberInput,
  Select,
  Textarea,
  Text
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useModals } from '@mantine/modals';
import { useRef } from 'react';
import { CURRENT, WAITING } from '../../lib/helper/constants';
import useNotification from '../../lib/hooks/useNotification';
import { FormProps } from './formTypes';

const Form: React.FC<FormProps> = props => {
  const {
    aniListData,
    firebaseData,
    updateAniListData,
    updateFirebaseData,
    removeFromList,
    removeCurrentEntry,
    removeWaitingEntry,
    close
  } = props;
  const { openConfirmModal, closeAll, closeModal } = useModals();
  const { showSuccess } = useNotification();
  const { progressVolumes, status, progress, media } = aniListData;

  const formValues = useRef({
    progressVolumes,
    progress,
    status,
    notes: firebaseData?.notes ?? '',
    preordered: firebaseData?.preordered ?? progressVolumes
  });

  const form = useForm({
    initialValues: formValues.current
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await Promise.all([
        updateAniListData({
          progress:
            values.progress === formValues.current.progress
              ? undefined
              : values.progress,
          progressVolumes:
            values.progressVolumes === formValues.current.progressVolumes
              ? undefined
              : values.progressVolumes,
          status:
            values.status === formValues.current.status
              ? undefined
              : values.status
        }),
        updateFirebaseData({
          notes:
            values.notes === formValues.current.notes
              ? undefined
              : values.notes,
          preordered:
            values.preordered === formValues.current.preordered
              ? undefined
              : values.preordered
        })
      ]);
      formValues.current = values;
      showSuccess(`${media.title.userPreferred} entry updated`);
      close();
    } catch (error) {
      console.log(error);
    }
  };

  const onExclude = () => {
    const id = openConfirmModal({
      title: 'Are you sure you want to remove this entry?',
      children: (
        <Text size="sm">
          This will remove the entry from the custom list &quot;{WAITING}&quot;
          on AniList and the entry will not show up on Manga Bai anymore.
          <br />
          <br />
          You can always undo this action by moving the entry back into the
          custom list on AniList.
        </Text>
      ),
      labels: { confirm: 'Remove', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: async () => {
        try {
          await removeFromList();
          if (aniListData.status === 'CURRENT')
            removeCurrentEntry(aniListData.mediaId);
          if (aniListData.status === 'PAUSED')
            removeWaitingEntry(aniListData.mediaId);
          closeAll();
        } catch (error) {
          console.log(error);
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
            description="Preorderd, bought, or owned volumes"
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
              href={media.siteUrl}
              referrerPolicy="no-referrer"
              target="_blank"
              title="Open this entry on AniList"
            >
              AniList
            </Anchor>
            <Button
              variant="subtle"
              title="Remove this entry from the list"
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
