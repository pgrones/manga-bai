import { useMutation } from '@apollo/client';
import { Anchor, Image, Stack, Text, Title } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import updateMangaEntry, {
  UpdateMangaEntryData,
  UpdateMangaEntryVariables
} from '../../apollo/mutations/updateMangaEntry';
import { MediaList } from '../../apollo/queries/mediaQuery';
import useNotification from '../../lib/hooks/useNotification';
import EditModal from '../edit/modal';
import Progress from '../edit/progress';
import { UpdatedValues } from './entryGrid';

const EntryList: React.FC<MediaList> = props => {
  const { status, progressVolumes } = props;
  const { title, coverImage } = props.media;
  const { hovered, ref } = useHover<HTMLTableRowElement>();
  const { showSuccess, showError } = useNotification();
  const [data, setData] = useState(props);
  const { mediaId, media } = data;

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

  const newVolumeAvailable = Math.random() > 0.7;

  return (
    <tr ref={ref}>
      <td>
        <Image
          radius="sm"
          style={{ objectFit: 'scale-down' }}
          height={40}
          width={40}
          src={coverImage.large}
          alt={title.userPreferred}
          withPlaceholder
        />
      </td>
      <td>
        <Text lineClamp={2} style={{ wordBreak: 'break-word' }}>
          <Title
            order={5}
            style={{ fontWeight: 'normal' }}
            title={title.userPreferred}
          >
            {title.userPreferred}
          </Title>
        </Text>
      </td>
      <td>
        <Progress
          text="Volume Progress:"
          progressKey="progressVolumes"
          progress={progressVolumes}
          buttonVisible={hovered}
          updateProgress={updateProgress}
        />
      </td>
      <td>
        <Progress
          text="Preordered Up To:"
          progressKey="progressVolumes"
          progress={progressVolumes}
          buttonVisible={hovered}
          updateProgress={updateProgress}
        />
      </td>
      <td>
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
      </td>
      <td>
        <EditModal
          {...props}
          status={status}
          progressVolumes={progressVolumes}
          updateData={updateData}
        />
      </td>
    </tr>
  );
};

export default EntryList;
