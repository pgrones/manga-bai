import { Center } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';

const MainCenter: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <Center
      sx={theme => ({
        height: `calc(100vh - var(--mantine-header-height, 0px) - ${
          theme.spacing.md * 2
        }px)`
      })}
    >
      {children}
    </Center>
  );
};

export default MainCenter;
