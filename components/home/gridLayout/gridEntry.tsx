import { Group, Paper, Stack, Text, useMantineTheme } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import Image from 'next/image';
import React from 'react';
import { getBorderRadius } from '../../../lib/helper/radius';
import EntryProvider from '../../../lib/hooks/entryProvider';
import { IMediaData } from '../../../lib/types/entry';
import EditModal from '../../edit/modal';
import PreorderedProgress from '../../edit/progress/preorderedProgress';
import VolumeProgress from '../../edit/progress/volumeProgress';

const GridEntry: React.FC<IMediaData> = React.memo(props => {
  const { coverImage, title } = props.media;
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();

  // const newVolumeAvailable = Math.random() > 0.7;

  return (
    <EntryProvider entry={props}>
      <Paper radius="sm" style={{ flex: 1 }}>
        <Group noWrap align="flex-start" spacing="sm">
          <div
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
            {/* {newVolumeAvailable && (
            <div className="new-volumes-available">
              <Text size="sm" sx={theme => ({ color: theme.colors.gray[0] })}>
                New Volume Available
              </Text>
            </div>
          )} */}
          </div>
          <Stack
            ref={ref}
            py="xs"
            pr="xs"
            align="stretch"
            justify="space-between"
            style={{ flexGrow: 1, minHeight: 170 }}
          >
            <div style={{ height: 39 }}>
              <Text
                component="a"
                referrerPolicy="no-referrer"
                target="_blank"
                href={`https://anilist.co/manga/${props.mediaId}`}
                lineClamp={2}
                size="sm"
                mt={-4}
              >
                {title.userPreferred}
              </Text>
            </div>
            <Stack spacing={2} pb={5}>
              <VolumeProgress buttonVisible={hovered} />
              <PreorderedProgress buttonVisible={hovered} />
            </Stack>

            <Group position="apart" align="center">
              <EditModal />
              {/* <Stack spacing={2} align="flex-end">
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
            </Stack> */}
            </Group>
          </Stack>
        </Group>
      </Paper>
    </EntryProvider>
  );
});

export default GridEntry;
