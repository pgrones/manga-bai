import {
  Badge,
  Box,
  Group,
  Image,
  Indicator,
  Paper,
  Stack,
  Text,
  Title
} from '@mantine/core';
import { MediaList } from '../apollo/queries/mediaQuery';
import EditModal from './edit/modal';

const Manga: React.FC<MediaList> = props => {
  const { status, progressVolumes, media } = props;
  const { coverImage, title } = media;

  return (
    <Paper withBorder radius="sm">
      <Group noWrap align="flex-start" spacing="sm">
        <Indicator
          size={14}
          withBorder
          color={status === 'CURRENT' ? 'indigo' : 'yellow'}
        >
          <Image
            radius="sm"
            style={{ objectFit: 'scale-down' }}
            height={200}
            width={130}
            src={coverImage.large}
            alt={title.userPreferred}
            withPlaceholder
          />
        </Indicator>
        <Stack
          py="xs"
          pr="xs"
          align="stretch"
          justify="space-between"
          style={{ flexGrow: 1, minHeight: 200 }}
        >
          <Box>
            <Text lineClamp={2} style={{ wordBreak: 'break-word' }}>
              <Title mb={4} order={5} title={title.userPreferred}>
                {title.userPreferred}
              </Title>
            </Text>
            <Text color="dimmed" mb={4}>
              {status === 'CURRENT'
                ? 'Currently Reading'
                : 'Waiting For New Chapters'}
            </Text>
            <Text>Volume Progress: {progressVolumes}</Text>
            <Text>Preordered Up To: {progressVolumes}</Text>
          </Box>
          <Group position="apart" align="center">
            <EditModal {...props} />
            {Math.random() > 0.7 && (
              <Badge
                variant="dot"
                color="green"
                style={{ lineHeight: 'unset', textTransform: 'none' }}
              >
                New Volume Available
              </Badge>
            )}
          </Group>
        </Stack>
      </Group>
    </Paper>
  );
};

export default Manga;
