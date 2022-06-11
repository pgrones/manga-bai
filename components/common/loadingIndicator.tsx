import { Loader } from '@mantine/core';
import MainCenter from './mainCenter';

const LoadingIndicator = () => {
  return (
    <MainCenter>
      <Loader size="lg" />
    </MainCenter>
  );
};

export default LoadingIndicator;
