import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FC } from 'react';
import { useEntry } from '../../../lib/hooks/provider/entryProvider';
import useNotification from '../../../lib/hooks/useNotification';
import Progress from './progress';

const VolumeProgress: FC<{ buttonVisible: boolean }> = props => {
  const { aniListData, updateAniListData, firebaseData, updateFirebaseData } =
    useEntry();
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.xs}px)`);
  const { showSuccess } = useNotification();

  const updateProgress = async (progress: number, originalProgress: number) => {
    if (progress !== aniListData.progressVolumes) {
      await updateAniListData({ progressVolumes: progress });
      if (!firebaseData?.preordered)
        await updateFirebaseData({ preordered: originalProgress });
      showSuccess(`${aniListData.media.title.userPreferred} entry updated`);
    }
  };

  return (
    <Progress
      text={`Volume${matches ? ' progress' : 's'}`}
      progress={aniListData.progressVolumes}
      updateProgress={updateProgress}
      {...props}
    />
  );
};

export default VolumeProgress;
