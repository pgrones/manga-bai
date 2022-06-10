import { Select } from '@mantine/core';
import { CURRENT, WAITING } from '../../../lib/helper/constants';
import { useMedia } from '../../../lib/hooks/mediaProvider';
import { Status } from '../../../lib/hooks/mediaProviderTypes';

const StatusSelect = () => {
  const { status, setStatus } = useMedia();

  return (
    <Select
      size="xs"
      placeholder="Status"
      clearable
      value={status}
      onChange={(v: Status) => setStatus(v)}
      data={[WAITING, CURRENT]}
    />
  );
};

export default StatusSelect;
