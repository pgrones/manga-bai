import {
  ActionIcon,
  Badge,
  Button,
  Group,
  MediaQuery,
  Paper,
  Text,
  useMantineTheme
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import Image from "next/legacy/image";
import { FC } from 'react';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { formatMap } from '../../../lib/helper/constants';
import { getBorderRadius } from '../../../lib/helper/radius';
import EntryProvider from '../../../lib/hooks/provider/entryProvider';
import { useUser } from '../../../lib/hooks/provider/userProvider';
import EditModal from '../../edit/modal';
import PreorderedProgress from '../../edit/progress/preorderedProgress';
import VolumeProgress from '../../edit/progress/volumeProgress';
import { ListEntryProps } from './listEntryTypes';

const ListEntry: FC<ListEntryProps> = props => {
  const { topRadius, bottomRadius } = props;
  const { title, coverImage, format } = props.media;
  const { userData } = useUser();
  const { hovered, ref } = useHover();
  const { hovered: imgHovered, ref: imgRef } = useHover();
  const theme = useMantineTheme();
  const borderRadius = getBorderRadius(theme).borderRadius;

  return (
    <EntryProvider entry={props}>
      <MediaQuery smallerThan="xs" styles={{ height: '75px !important' }}>
        <Paper
          ref={ref}
          px="xs"
          radius={0}
          withBorder={theme.colorScheme === 'light'}
          sx={theme => ({
            ...(topRadius
              ? {
                  borderTopLeftRadius: borderRadius,
                  borderTopRightRadius: borderRadius,
                  borderBottom: 0
                }
              : bottomRadius
              ? {
                  borderBottomLeftRadius: borderRadius,
                  borderBottomRightRadius: borderRadius,
                  borderTop: 0
                }
              : { borderTop: 0, borderBottom: 0 }),
            'height': 55,
            '&:hover': {
              backgroundColor: theme.fn.rgba(
                theme.colors[theme.primaryColor][6],
                0.08
              )
            }
          })}
        >
          <MediaQuery
            smallerThan="xs"
            styles={{
              paddingLeft: 55,
              gap: '8px !important',
              height: '60px !important',
              paddingTop: 12
            }}
          >
            <Group
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
                  ref={imgRef}
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

                  {imgHovered && (
                    <EditModal>
                      <ActionIcon
                        title="Edit"
                        variant="filled"
                        size={40}
                        style={{
                          backgroundColor: theme.fn.rgba(
                            theme.colors[theme.primaryColor][8],
                            0.6
                          ),
                          position: 'absolute',
                          zIndex: 1
                        }}
                      >
                        <IoEllipsisHorizontal size={26} />
                      </ActionIcon>
                    </EditModal>
                  )}
                </div>
              </MediaQuery>

              <MediaQuery
                smallerThan="xs"
                styles={{ flexBasis: '100% !important' }}
              >
                <Group noWrap position="apart" style={{ flex: 3 }}>
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
                        href={`https://anilist.co/manga/${props.mediaId}`}
                        lineClamp={2}
                        style={{ wordBreak: 'break-word', fontSize: 15 }}
                        color={
                          theme.colorScheme === 'dark' ? 'white' : undefined
                        }
                      >
                        {title.userPreferred}{' '}
                      </Text>
                    </MediaQuery>
                  </div>
                  {!userData?.volumeCheckDisabled && props.hasNewVolume && (
                    <div style={{ width: 170 }}>
                      <Badge fullWidth>New Volume Available</Badge>
                    </div>
                  )}
                </Group>
              </MediaQuery>

              <VolumeProgress buttonVisible={hovered} />
              <PreorderedProgress buttonVisible={hovered} />

              <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
                <Group style={{ flex: 2, justifyContent: 'space-around' }}>
                  <Text size="sm" title="Format" color="dimmed">
                    {formatMap[format]}
                  </Text>
                </Group>
              </MediaQuery>

              <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
                <div>
                  <EditModal>
                    <Button size="xs" variant="light" title="Edit">
                      Edit
                    </Button>
                  </EditModal>
                </div>
              </MediaQuery>
            </Group>
          </MediaQuery>
        </Paper>
      </MediaQuery>
    </EntryProvider>
  );
};

export default ListEntry;
