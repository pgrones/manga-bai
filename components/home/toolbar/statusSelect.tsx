import { MediaQuery, Select } from '@mantine/core';
import { CURRENT, WAITING } from '../../../lib/helper/constants';
import { useMedia } from '../../../lib/hooks/provider/mediaProvider';
import { Status } from '../../../lib/hooks/provider/mediaProviderTypes';

const StatusSelect = () => {
  const { status, setStatus } = useMedia();

  return (
    <MediaQuery
      query="(max-width: 410px)"
      styles={{ width: '100% !important' }}
    >
      <MediaQuery
        smallerThan="sm"
        styles={{ width: 'min(203px, 48%) !important' }}
      >
        <Select
          size="xs"
          placeholder="Status"
          style={{ width: 203 }}
          clearable
          value={status}
          onChange={(v: Status) => setStatus(v)}
          data={[WAITING, CURRENT]}
        />
      </MediaQuery>
    </MediaQuery>
  );
};

export default StatusSelect;
