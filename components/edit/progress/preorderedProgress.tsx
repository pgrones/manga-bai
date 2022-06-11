import React from 'react';
import { useEntry } from '../../../lib/hooks/provider/entryProvider';
import Progress from './progress';

const PreorderedProgress: React.FC<{ buttonVisible: boolean }> = ({
  buttonVisible
}) => {
  const { aniListData, firebaseData, updatePreordered } = useEntry();

  return (
    <Progress
      text="Preordered up to"
      buttonVisible={buttonVisible}
      progress={firebaseData?.preordered ?? aniListData.progressVolumes}
      updateProgress={updatePreordered}
    />
  );
};

export default PreorderedProgress;
