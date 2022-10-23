import { ActionIcon, Group, MediaQuery, Text } from '@mantine/core';
import { FC, memo, useEffect, useRef, useState } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import useDevice from '../../../lib/hooks/useDevice';
import { ProgressProps } from './progressTypes';

const Progress: FC<ProgressProps> = memo(
  ({ progress, buttonVisible, updateProgress, text }) => {
    const [progressLocal, setProgressLocal] = useState(progress);
    const originalProgress = useRef<number>();
    const phone = useDevice() === 'phone';

    useEffect(() => {
      setProgressLocal(progress);
    }, [progress]);

    useEffect(() => {
      if (originalProgress.current !== undefined) {
        updateProgress(progressLocal);
        originalProgress.current = undefined;
      }
    }, [progressLocal]);

    return (
      <MediaQuery smallerThan="sm" styles={{ flex: 'none !important' }}>
        <Group spacing={2} position="center" style={{ flex: 2 }} noWrap>
          <Text size="sm" style={{ whiteSpace: 'nowrap' }} color="dimmed">
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
            {(buttonVisible || phone) && <IoAddOutline size={20} />}
          </ActionIcon>
        </Group>
      </MediaQuery>
    );
  }
);

export default Progress;
