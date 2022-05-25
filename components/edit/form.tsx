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
import { UpdatedValues } from '../manga';

const Form: React.FC<
  MediaList & {
    close: () => void;
    updateData: (values: UpdatedValues) => void;
  }
> = props => {
  const { progressVolumes, status, progress, media, close, updateData } = props;

  const form = useForm({
    initialValues: {
      progressVolumes,
      progress,
      status,
      notes: '',
      purchased: 0
    }
  });

  const handleSubmit = async (values: typeof form.values) => {
    close();
    updateData(values);
  };

  return (
    <form id="form" onSubmit={form.onSubmit(handleSubmit)}>
      <Grid mt="md" mb={5} gutter="xl" align="flex-end">
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
            min={0}
            variant="filled"
            label="Volume Progress"
          />
        </Grid.Col>
        <Grid.Col mt="xl" span={4}>
          <NumberInput
            {...form.getInputProps('progress')}
            min={0}
            variant="filled"
            label="Chapter Progress"
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <NumberInput
            {...form.getInputProps('purchased')}
            min={0}
            variant="filled"
            label="Purchased Up To"
            description="Owned, purchased or preorderd"
          />
        </Grid.Col>
        <Grid.Col span={4}>
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
        <Grid.Col span={4}>
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
