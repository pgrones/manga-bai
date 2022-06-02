import { Center, Loader } from '@mantine/core';

const LoadingIndicator = () => {
  return (
    <Center
      style={{
        height: 'calc(100vh - var(--mantine-header-height))',
        marginTop: 'var(--mantine-header-height)'
      }}
    >
      <Loader size="lg" />
    </Center>
  );
};

export default LoadingIndicator;
