import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { useEntry } from '../../../lib/hooks/provider/entryProvider';
import Progress from './progress';

const PreorderedProgress: React.FC<{ buttonVisible: boolean }> = ({
  buttonVisible
}) => {
  const { aniListData, firebaseData, updatePreordered } = useEntry();
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.xs}px)`);

  return (
    <Progress
      text={`Preordered${matches ? ' up to' : ''}`}
      buttonVisible={buttonVisible}
      progress={firebaseData?.preordered ?? aniListData.progressVolumes}
      updateProgress={updatePreordered}
    />
  );
};

export default PreorderedProgress;
