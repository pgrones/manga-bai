import { ActionIcon, Group, MediaQuery, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { ProgressProps } from './progressTypes';

const Progress: FC<ProgressProps> = memo(
  ({ progress, buttonVisible, updateProgress, text }) => {
    const [progressLocal, setProgressLocal] = useState(progress);
    const [debouncedProgressVolumes] = useDebouncedValue(progressLocal, 500);
    const originalProgress = useRef<number>();

    useEffect(() => {
      setProgressLocal(progress);
    }, [progress]);

    useEffect(() => {
      if (originalProgress.current !== undefined) {
        updateProgress(debouncedProgressVolumes, originalProgress.current);
        originalProgress.current = undefined;
      }
    }, [debouncedProgressVolumes]);

    return (
      <MediaQuery smallerThan="sm" styles={{ flex: 'none !important' }}>
        <Group spacing={2} style={{ flex: 2 }} noWrap>
          <Text size="sm" style={{ whiteSpace: 'nowrap' }}>
            {text}: {progressLocal}
          </Text>
          <ActionIcon
            size="xs"
            onClick={() => {
              if (originalProgress.current === undefined)
                originalProgress.current = progressLocal;
              setProgressLocal(prev => prev + 1);
            }}
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
