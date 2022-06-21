import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { useEntry } from '../../../lib/hooks/provider/entryProvider';
import Progress from './progress';

const VolumeProgress: React.FC<{ buttonVisible: boolean }> = ({
  buttonVisible
}) => {
  const { aniListData, updateProgress } = useEntry();
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.xs}px)`);

  return (
    <Progress
      text={`Volume${matches ? ' progress' : 's'}`}
      buttonVisible={buttonVisible}
      progress={aniListData.progressVolumes}
      updateProgress={(progress: number) =>
        updateProgress(progress, 'progressVolumes')
      }
    />
  );
};

export default VolumeProgress;
