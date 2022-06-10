import { Center, Loader } from '@mantine/core';

const LoadingIndicator = () => {
  return (
    <Center
      sx={theme => ({
        height: `calc(100vh - var(--mantine-header-height) - ${
          theme.spacing.md * 2
        }px)`
      })}
    >
      <Loader size="lg" />
    </Center>
  );
};

export default LoadingIndicator;
