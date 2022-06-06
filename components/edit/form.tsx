import {
  Anchor,
  Button,
  Grid,
  Group,
  NumberInput,
  Select,
  Textarea
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRef } from 'react';
import useNotification from '../../lib/hooks/useNotification';
import { FormProps } from './formTypes';

const Form: React.FC<FormProps> = props => {
  const {
    aniListData,
    firebaseData,
    updateAniListData,
    updateFirebaseData,
    close
  } = props;
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

  return (
    <form id="form" onSubmit={form.onSubmit(handleSubmit)}>
      <Grid mt="xl" pt="md" mb={5} gutter="xl" align="flex-end">
        <Grid.Col xs={6} sm={4}>
          <Select
            {...form.getInputProps('status')}
            variant="filled"
            label="Status"
            data={[
              { label: 'Currently Reading', value: 'CURRENT' },
              { label: 'Wating For New Volumes', value: 'PAUSED' }
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
                paddingTop: 0 + ' !important',
                paddingBottom: 0 + ' !important',
                lineHeight: '34px'
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
              title="Exclude this entry from the list. This will not affect your lists on AniList"
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
              Exclude
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default Form;
