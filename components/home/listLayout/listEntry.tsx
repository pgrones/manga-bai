import { useMutation } from '@apollo/client';
import { Group, Paper, Text, Title, useMantineTheme } from '@mantine/core';
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

const ListEntry: React.FC<
  MediaList & { topRadius: boolean; bottomRadius: boolean }
> = props => {
  const { status, progressVolumes, topRadius, bottomRadius } = props;
  const { title, coverImage } = props.media;
  const { hovered, ref } = useHover();
  const { showSuccess, showError } = useNotification();
  const [data, setData] = useState(props);
  const { mediaId, media } = data;
  const theme = useMantineTheme();

  const borderRadius = getBorderRadius(theme).borderRadius;

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
          />
        </div>

        <Text lineClamp={2} style={{ wordBreak: 'break-word', flex: 3 }}>
          <Title
            order={5}
            style={{ fontWeight: 'normal' }}
            title={title.userPreferred}
          >
            {title.userPreferred}
          </Title>
        </Text>

        <Progress
          style={{ flex: 1 }}
          text="Volume progress:"
          progressKey="progressVolumes"
          progress={progressVolumes}
          buttonVisible={hovered}
          updateProgress={updateProgress}
        />

        <Progress
          style={{ flex: 1 }}
          text="Preordered up to:"
          progressKey="progressVolumes"
          progress={progressVolumes}
          buttonVisible={hovered}
          updateProgress={updateProgress}
        />

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

        <EditModal
          {...props}
          status={status}
          progressVolumes={progressVolumes}
          updateData={updateData}
        />
      </Group>
    </Paper>
  );
};

export default ListEntry;
