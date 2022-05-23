import {
  Anchor,
  Box,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title
} from '@mantine/core';
import { MediaList } from '../apollo/queries/listQuery';
import Edit from './edit';

const Manga: React.FC<MediaList> = ({ status, progressVolumes, media }) => {
  const { coverImage, title, siteUrl } = media;

  return (
    <Paper withBorder radius="sm">
      <Group noWrap align="flex-start" spacing="sm">
        <Image
          radius="sm"
          sx={{ objectFit: 'scale-down' }}
          height={200}
          width={130}
          src={coverImage.large}
          alt={title.userPreferred}
          withPlaceholder
        />
        <Stack
          py="sm"
          pr="sm"
          align="stretch"
          justify="space-between"
          sx={{ height: 200, flexGrow: 1 }}
        >
          <Box>
            {/* {Math.random() > 0.7 && (
              <Badge variant="dot" color="teal" sx={{ lineHeight: 'unset' }}>
                New Volume available
              </Badge>
            )} */}
            <Text lineClamp={2}>
              <Title mb="xs" order={6} title={title.userPreferred}>
                {title.userPreferred}
              </Title>
            </Text>
            <Text color="dimmed">Volume Progress: {progressVolumes}</Text>
            <Text color="dimmed">Preordered Up To: {progressVolumes}</Text>
          </Box>
          <Group position="apart" align="flex-end">
            <Edit />
            <Box>
              <Anchor
                href={siteUrl}
                referrerPolicy="no-referrer"
                target="_blank"
              >
                AniList
              </Anchor>
            </Box>
          </Group>
        </Stack>
      </Group>
    </Paper>
  );
};

export default Manga;
