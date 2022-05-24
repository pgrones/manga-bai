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
import { MediaList } from '../../apollo/queries/mediaQuery';

const Form: React.FC<MediaList> = props => {
  const { progressVolumes, status, progress, media } = props;

  const form = useForm({
    initialValues: {
      progressVolumes,
      progress,
      status,
      notes: '',
      preordered: 0
    }
  });

  const handleSubmit = (values: typeof form.values) => console.log(values);

  return (
    <form id="form" onSubmit={form.onSubmit(handleSubmit)}>
      <Grid mt="md" gutter="xl" align="flex-end">
        <Grid.Col mt="xl" span={4}>
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
        <Grid.Col mt="xl" span={4}>
          <NumberInput
            {...form.getInputProps('progressVolumes')}
            variant="filled"
            label="Volume Progress"
          />
        </Grid.Col>
        <Grid.Col mt="xl" span={4}>
          <NumberInput
            {...form.getInputProps('progress')}
            variant="filled"
            label="Chapter Progress"
          />
        </Grid.Col>
        <Grid.Col mt="xl" span={4}>
          <NumberInput
            {...form.getInputProps('preordered')}
            variant="filled"
            label="Preordered Up To"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Textarea
            {...form.getInputProps('notes')}
            autosize
            minRows={1}
            maxRows={4}
            variant="filled"
            label="Notes"
            description="These will not be visible on AniList"
            placeholder="Links, Prices, etc."
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Group position="right">
            <Anchor
              href={media.siteUrl}
              referrerPolicy="no-referrer"
              target="_blank"
            >
              AniList
            </Anchor>
            <Button
              variant="default"
              color="gray"
              title="Exclude this manga from the list. This will not affect your lists on AniList"
              sx={theme => ({
                '&:hover': { backgroundColor: theme.colors.red[8] }
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
