import { Group, Paper, Text, Title, useMantineTheme } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import Image from 'next/image';
import React from 'react';
import { getBorderRadius } from '../../../lib/helper/radius';
import EntryProvider from '../../../lib/hooks/entryProvider';
import { IMediaData } from '../../../lib/types/entry';
import EditModal from '../../edit/modal';
import PreorderedProgress from '../../edit/progress/preorderedProgress';
import VolumeProgress from '../../edit/progress/volumeProgress';

const ListEntry: React.FC<
  IMediaData & { topRadius: boolean; bottomRadius: boolean; priority: boolean }
> = props => {
  const { topRadius, bottomRadius, priority } = props;
  const { title, coverImage } = props.media;
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();
  const borderRadius = getBorderRadius(theme).borderRadius;

  // const newVolumeAvailable = Math.random() > 0.7;

  return (
    <EntryProvider entry={props}>
      <Paper
        ref={ref}
        px="xs"
        radius={0}
        sx={theme => ({
          ...(topRadius
            ? {
                borderTopLeftRadius: borderRadius,
                borderTopRightRadius: borderRadius
              }
            : bottomRadius
            ? {
                borderBottomLeftRadius: borderRadius,
                borderBottomRightRadius: borderRadius
              }
            : {}),
          'height': 55,
          '&:hover': {
            backgroundColor: theme.fn.rgba(
              theme.colors[theme.primaryColor][6],
              0.08
            )
          }
        })}
      >
        <Group spacing="xl" style={{ height: 55 }}>
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
              priority={priority}
              sizes="40px"
            />
          </div>

          <div style={{ flex: 3 }}>
            <Text
              component="a"
              referrerPolicy="no-referrer"
              target="_blank"
              href={`https://anilist.co/manga/${props.mediaId}`}
              lineClamp={2}
              style={{ wordBreak: 'break-word' }}
            >
              <Title
                order={5}
                style={{ fontWeight: 'normal' }}
                title={title.userPreferred}
              >
                {title.userPreferred}
              </Title>
            </Text>
          </div>
          <VolumeProgress buttonVisible={hovered} />
          <PreorderedProgress buttonVisible={hovered} />

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

          <EditModal />
        </Group>
      </Paper>
    </EntryProvider>
  );
};

export default ListEntry;
