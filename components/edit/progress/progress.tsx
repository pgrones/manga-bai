import { ActionIcon, Group, MediaQuery, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import React, { useEffect, useState } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { ProgressProps } from './progressTypes';

const Progress: React.FC<ProgressProps> = React.memo(
  ({ progress, buttonVisible, updateProgress, text }) => {
    const [progressLocal, setProgressLocal] = useState(progress);
    const [debouncedProgressVolumes] = useDebouncedValue(progressLocal, 500);

    useEffect(() => {
      setProgressLocal(progress);
    }, [progress]);

    useEffect(() => {
      updateProgress(debouncedProgressVolumes);
    }, [debouncedProgressVolumes]);

    return (
      <MediaQuery smallerThan="sm" styles={{ flex: 'none !important' }}>
        <Group spacing={2} style={{ flex: 2 }} noWrap>
          <Text size="sm" style={{ whiteSpace: 'nowrap' }}>
            {text}: {progressLocal}
          </Text>
          <ActionIcon
            size="xs"
            onClick={() => setProgressLocal(prev => prev + 1)}
            title={`Increase ${text}`}
          >
            {buttonVisible && <IoAddOutline size={20} />}
          </ActionIcon>
        </Group>
      </MediaQuery>
    );
  }
);

export default Progress;
