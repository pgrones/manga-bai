import { useOs } from '@mantine/hooks';

const useDevice = () => {
  const os = useOs();
  return ['ios', 'android'].includes(os) ? 'phone' : 'desktop';
};

export default useDevice;
