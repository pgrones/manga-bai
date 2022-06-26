import {
  Button,
  Center,
  Group,
  MediaQuery,
  Popover,
  Stack,
  Text,
  useMantineTheme
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import { FC } from 'react';
import { IoChevronDownOutline } from 'react-icons/io5';
import { CURRENT, formatMap, WAITING } from '../../lib/helper/constants';
import { getBorderRadius } from '../../lib/helper/radius';
import { RemovedMediaEntry as RemovedMediaEntryProps } from './removedMediaTypes';

const RemovedMediaEntry: FC<RemovedMediaEntryProps> = props => {
  const { coverImage, title, id, format, undoRemoval } = props;
  const theme = useMantineTheme();
  const borderRadius = getBorderRadius(theme).borderRadius;
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <MediaQuery
      smallerThan="xs"
      styles={{
        paddingLeft: 65,
        gap: '5px !important',
        height: '60px !important',
        paddingTop: 12
      }}
    >
      <Group
        px="md"
        spacing="xl"
        position="apart"
        align="center"
        style={{ height: 55 }}
      >
        <MediaQuery
          smallerThan="xs"
          styles={{
            position: 'absolute !important' as any,
            left: 10,
            top: 15
          }}
        >
          <div
            style={{
              position: 'relative',
              height: 40,
              minHeight: 40,
              maxWidth: 40,
              minWidth: 40,
              flex: 1,
              borderRadius
            }}
          >
            <Image
              layout="fill"
              objectFit="cover"
              src={coverImage.large}
              alt={title.userPreferred}
              style={{ borderRadius }}
              sizes="40px"
            />
          </div>
        </MediaQuery>

        <MediaQuery smallerThan="xs" styles={{ flexBasis: '100% !important' }}>
          <div style={{ flex: 3 }}>
            <div style={{ display: 'table' }}>
              <MediaQuery
                smallerThan="xs"
                styles={{ WebkitLineClamp: '1 !important' as any }}
              >
                <Text
                  title="Open this entry on AniList"
                  component="a"
                  referrerPolicy="no-referrer"
                  target="_blank"
                  href={`https://anilist.co/manga/${id}`}
                  lineClamp={2}
                  style={{ wordBreak: 'break-word', fontSize: 15 }}
                >
                  {title.userPreferred}
                </Text>
              </MediaQuery>
            </div>
          </div>
        </MediaQuery>

        <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
          <Center style={{ flex: 3 }}>
            <Text size="sm" title="Format">
              {formatMap[format]}
            </Text>
          </Center>
        </MediaQuery>

        <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
          <Group>
            <Text size="sm">Put this entry back into</Text>
            <Button
              size="xs"
              variant="light"
              title="Undo Removal"
              onClick={() => undoRemoval(true)}
            >
              {WAITING}
            </Button>
            <Button
              size="xs"
              variant="light"
              title="Undo Removal"
              onClick={() => undoRemoval(false)}
            >
              {CURRENT}
            </Button>
          </Group>
        </MediaQuery>

        <MediaQuery largerThan="md" styles={{ display: 'none' }}>
          <Popover
            opened={opened}
            onClose={close}
            transition="scale-y"
            target={
              <Button
                size="xs"
                variant="light"
                title="Undo Removal"
                onClick={toggle}
                rightIcon={<IoChevronDownOutline size={18} />}
                compact
              >
                Undo Removal
              </Button>
            }
            styles={{ inner: { padding: '10px 0 5px 0' } }}
            position="bottom"
            withArrow
          >
            <Stack spacing={0}>
              <Text px={18} pb={5} size="sm">
                Put this entry back into
              </Text>
              <Button
                variant="subtle"
                color="gray"
                onClick={() => undoRemoval(true)}
                styles={{ inner: { justifyContent: 'flex-start' } }}
              >
                {WAITING}
              </Button>
              <Button
                variant="subtle"
                color="gray"
                onClick={() => undoRemoval(false)}
                styles={{ inner: { justifyContent: 'flex-start' } }}
              >
                {CURRENT}
              </Button>
            </Stack>
          </Popover>
        </MediaQuery>
      </Group>
    </MediaQuery>
  );
};

export default RemovedMediaEntry;
