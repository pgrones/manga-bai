import React from 'react';
import { useEntry } from '../../../lib/hooks/entryProvider';
import Progress from './progress';

const VolumeProgress: React.FC<{ buttonVisible: boolean }> = ({
  buttonVisible
}) => {
  const { aniListData, updateProgress } = useEntry();

  return (
    <Progress
      text="Volume progress:"
      buttonVisible={buttonVisible}
      progress={aniListData.progressVolumes}
      updateProgress={
        (progress: number) => {} // updateProgress(progress, 'progressVolumes')
      }
    />
  );
};

export default VolumeProgress;
