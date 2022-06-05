import { useMutation } from '@apollo/client';
import {
  Group,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import updateMangaEntry, {
  UpdateMangaEntryData,
  UpdateMangaEntryVariables
} from '../../../apollo/mutations/updateMangaEntry';
import { MediaList } from '../../../apollo/queries/mediaQuery';
import { getBorderRadius } from '../../../lib/helper/radius';
import useNotification from '../../../lib/hooks/useNotification';
import EditModal from '../../edit/modal';
import Progress from '../../edit/progress';
import { UpdatedValues } from '../manga';

const GridEntry: React.FC<MediaList & { priority: boolean }> = React.memo(
  props => {
    const { coverImage, title } = props.media;
    const { hovered, ref } = useHover();
    const { showSuccess, showError } = useNotification();
    const theme = useMantineTheme();

    const [data, setData] = useState(props);
    const { status, progressVolumes, mediaId, media } = data;

    const [updateEntry, { error }] = useMutation<
      UpdateMangaEntryData,
      UpdateMangaEntryVariables
    >(updateMangaEntry);

    useEffect(() => {
      if (error) showError();
    }, [error]);

    const updateData = async (values: UpdatedValues) => {
      Object.keys(values).forEach(key => {
        if (values[key as keyof typeof values] === undefined)
          delete values[key as keyof typeof values];
      });

      if (!Object.keys(values).length) return;

      const { data } = await updateEntry({
        variables: { ...values, mediaId }
      });

      if (!data) return;

      setData(prev => ({ ...prev, ...data.SaveMediaListEntry }));
      showSuccess(`${media.title.userPreferred} Entry Updated`);
    };

    const updateProgress = (progress: number, key: keyof MediaList) => {
      if (progress === data[key]) return;
      updateData({ [key]: progress });
    };

    // const newVolumeAvailable = Math.random() > 0.7;

    return (
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
              priority={props.priority}
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
            <Text lineClamp={2} style={{ wordBreak: 'break-word', height: 38 }}>
              <Title
                order={6}
                style={{ fontWeight: 'normal' }}
                title={title.userPreferred}
              >
                {title.userPreferred}
              </Title>
            </Text>
            <Stack spacing={2} pb={5}>
              <Progress
                text="Volume progress:"
                progressKey="progressVolumes"
                progress={progressVolumes}
                buttonVisible={hovered}
                updateProgress={updateProgress}
              />
              <Progress
                text="Preordered up to:"
                progressKey="progressVolumes"
                progress={progressVolumes}
                buttonVisible={hovered}
                updateProgress={updateProgress}
              />
            </Stack>

            <Group position="apart" align="center">
              <EditModal
                {...props}
                status={status}
                progressVolumes={progressVolumes}
                updateData={updateData}
              />
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
    );
  }
);

export default GridEntry;
