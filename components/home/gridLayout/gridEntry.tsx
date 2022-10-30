import {
  ActionIcon,
  Box,
  Button,
  Group,
  MediaQuery,
  Paper,
  Stack,
  Text,
  useMantineTheme
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import Image from 'next/image';
import { FC, memo } from 'react';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { getBorderRadius } from '../../../lib/helper/radius';
import EntryProvider from '../../../lib/hooks/provider/entryProvider';
import { useUser } from '../../../lib/hooks/provider/userProvider';
import { IMediaData } from '../../../lib/types/entry';
import EditModal from '../../edit/modal';
import PreorderedProgress from '../../edit/progress/preorderedProgress';
import VolumeProgress from '../../edit/progress/volumeProgress';

const GridEntry: FC<IMediaData> = memo(props => {
  const { coverImage, title } = props.media;
  const { userData } = useUser();
  const { hovered, ref } = useHover();
  const { hovered: imgHovered, ref: imgRef } = useHover();
  const theme = useMantineTheme();

  return (
    <EntryProvider entry={props}>
      <Paper
        radius="sm"
        withBorder={theme.colorScheme === 'light'}
        style={{ flex: 1 }}
      >
        <Group noWrap align="flex-start" spacing="sm">
          <MediaQuery
            smallerThan="lg"
            styles={{
              height: '120px !important',
              width: '85px !important',
              minWidth: '85px !important'
            }}
          >
            <div
              ref={imgRef}
              style={{
                position: 'relative',
                height: 170,
                width: 120,
                minWidth: 120,
                ...getBorderRadius(theme)
              }}
            >
              <Image
                layout="fill"
                objectFit="cover"
                src={coverImage.large}
                alt={title.userPreferred}
                style={getBorderRadius(theme)}
                sizes="120px"
              />
              {!userData?.volumeCheckDisabled && props.hasNewVolume && (
                <Box
                  pl={8}
                  py={5}
                  sx={theme => ({
                    backgroundColor:
                      theme.colorScheme === 'light'
                        ? theme.white
                        : theme.colors.dark[7]
                  })}
                  className="new-volumes-available"
                >
                  <Group spacing="xs" position="apart" noWrap>
                    <Box
                      sx={theme => ({
                        minHeight: 10,
                        minWidth: 10,
                        borderRadius: 20,
                        backgroundColor:
                          theme.colors[theme.primaryColor][
                            theme.colorScheme === 'dark' ? 3 : 6
                          ]
                      })}
                    />
                    <Text
                      size="sm"
                      weight={500}
                      color={theme.colorScheme === 'dark' ? 'white' : undefined}
                    >
                      New Volume Available
                    </Text>
                  </Group>
                </Box>
              )}
              {imgHovered && (
                <EditModal>
                  <ActionIcon
                    title="Edit"
                    variant="filled"
                    style={{
                      backgroundColor: theme.fn.rgba(
                        theme.colors[theme.primaryColor][8],
                        0.6
                      ),
                      position: 'absolute',
                      left: 5,
                      top: 5,
                      zIndex: 1
                    }}
                  >
                    <IoEllipsisHorizontal size={20} />
                  </ActionIcon>
                </EditModal>
              )}
            </div>
          </MediaQuery>
          <MediaQuery
            smallerThan="lg"
            styles={{
              minHeight: '120px !important',
              maxHeight: '120px !important'
            }}
          >
            <Stack
              ref={ref}
              py="xs"
              pr="xs"
              spacing={0}
              align="stretch"
              justify="space-between"
              style={{ flexGrow: 1, maxHeight: 170, minHeight: 170 }}
            >
              <div style={{ minHeight: 39 }}>
                <div style={{ display: 'table' }}>
                  <Text
                    title="Open this entry on AniList"
                    component="a"
                    referrerPolicy="no-referrer"
                    target="_blank"
                    href={`https://anilist.co/manga/${props.mediaId}`}
                    lineClamp={2}
                    size="sm"
                    mt={-4}
                    color={theme.colorScheme === 'dark' ? 'white' : undefined}
                  >
                    {title.userPreferred}
                  </Text>
                </div>
              </div>

              <Stack align="flex-start" spacing={8} pb={5}>
                <VolumeProgress buttonVisible={hovered} />
                <PreorderedProgress buttonVisible={hovered} />
              </Stack>

              <MediaQuery smallerThan="lg" styles={{ display: 'none' }}>
                <Group position="apart" align="center">
                  <EditModal>
                    <Button size="xs" variant="light" title="Edit">
                      Edit
                    </Button>
                  </EditModal>
                </Group>
              </MediaQuery>
            </Stack>
          </MediaQuery>
        </Group>
      </Paper>
    </EntryProvider>
  );
});

export default GridEntry;
