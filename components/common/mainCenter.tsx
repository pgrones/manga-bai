import { Center } from '@mantine/core';
import React from 'react';

const MainCenter: React.FC<React.PropsWithChildren<unknown>> = ({
  children
}) => {
  return (
    <Center
      sx={theme => ({
        height: `calc(100vh - var(--mantine-header-height) - ${
          theme.spacing.md * 2
        }px)`
      })}
    >
      {children}
    </Center>
  );
};

export default MainCenter;
