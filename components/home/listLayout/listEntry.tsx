import {
  ActionIcon,
  Button,
  Center,
  Group,
  MediaQuery,
  Paper,
  Text,
  useMantineTheme
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import Image from 'next/image';
import React from 'react';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import { Format } from '../../../apollo/queries/mediaListQuery';
import { getBorderRadius } from '../../../lib/helper/radius';
import EntryProvider from '../../../lib/hooks/provider/entryProvider';
import { IMediaData } from '../../../lib/types/entry';
import EditModal from '../../edit/modal';
import PreorderedProgress from '../../edit/progress/preorderedProgress';
import VolumeProgress from '../../edit/progress/volumeProgress';

const formatMap: { [key in Format]: string } = {
  ONE_SHOT: 'One Shot',
  MANGA: 'Manga',
  NOVEL: 'Light Novel'
};

const ListEntry: React.FC<
  IMediaData & { topRadius: boolean; bottomRadius: boolean }
> = props => {
  const { topRadius, bottomRadius } = props;
  const { title, coverImage, format } = props.media;
  const { hovered, ref } = useHover();
  const { hovered: imgHovered, ref: imgRef } = useHover();
  const theme = useMantineTheme();
  const borderRadius = getBorderRadius(theme).borderRadius;

  // const newVolumeAvailable = Math.random() > 0.7;

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
                        href={`https://anilist.co/manga/${props.mediaId}`}
                        lineClamp={2}
                        style={{ wordBreak: 'break-word', fontSize: 15 }}
                      >
                        {title.userPreferred}
                      </Text>
                    </MediaQuery>
                  </div>
                </div>
              </MediaQuery>
              <VolumeProgress buttonVisible={hovered} />
              <PreorderedProgress buttonVisible={hovered} />
              <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
                <Center style={{ flex: 2 }}>
                  <Text size="sm" title="Format">
                    {formatMap[format]}
                  </Text>
                </Center>
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
              {/* 
        {newVolumeAvailable && (
          <Stack spacing={2}>
            <Anchor
              size="sm"
              href="https://amzn.to/3lEKHwX"
              target="_blank"
              referrerPolicy="no-referrer"
              style={{ lineHeight: 1 }}
            >
              Buy on Amazon
            </Anchor>
            <Text size="xs" color="dimmed" style={{ lineHeight: 1 }}>
              (Affiliate Link)
            </Text>
          </Stack>
        )}
       */}
            </Group>
          </MediaQuery>
        </Paper>
      </MediaQuery>
    </EntryProvider>
  );
};

export default ListEntry;
