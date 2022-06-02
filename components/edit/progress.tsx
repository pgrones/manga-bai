import { ActionIcon, Group, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { MediaList } from '../../apollo/queries/mediaQuery';

interface ProgressProps {
  text: string;
  progress: number;
  buttonVisible: boolean;
  progressKey: keyof MediaList;
  updateProgress: (
    progress: number,
    key: keyof MediaList
  ) => void | Promise<void>;
}

const Progress: React.FC<ProgressProps> = React.memo(
  ({ progress, buttonVisible, updateProgress, text, progressKey }) => {
    const [progressLocal, setProgressLocal] = useState(progress);
    const [debouncedProgressVolumes] = useDebouncedValue(progressLocal, 500);

    useEffect(() => {
      setProgressLocal(progress);
    }, [progress]);

    useEffect(() => {
      updateProgress(debouncedProgressVolumes, progressKey);
    }, [debouncedProgressVolumes]);

    return (
      <Group spacing={2}>
        <Text size="sm">
          {text} {progressLocal}
        </Text>
        <ActionIcon
          size="xs"
          onClick={() => setProgressLocal(prev => prev + 1)}
        >
          {buttonVisible && <IoAddOutline size={20} />}
        </ActionIcon>
      </Group>
    );
  }
);

export default Progress;
