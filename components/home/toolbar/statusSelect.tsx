import { MediaQuery, Select } from '@mantine/core';
import { CURRENT, NEW_VOLUMES, WAITING } from '../../../lib/helper/constants';
import { useMedia } from '../../../lib/hooks/provider/mediaProvider';
import { Status } from '../../../lib/hooks/provider/mediaProviderTypes';

const StatusSelect = () => {
  const { status, changeStatus } = useMedia();

  return (
    <MediaQuery
      query="(max-width: 410px)"
      styles={{ width: '100% !important' }}
    >
      <MediaQuery
        smallerThan="sm"
        styles={{ width: 'min(210px, 48%) !important' }}
      >
        <Select
          size="xs"
          placeholder="Status"
          styles={{
            root: { width: 210 },
            input: { fontSize: 14 },
            rightSection: {
              width: status ? 30 : undefined,
              button: { width: 30, height: '100%' },
              svg: { width: 16, height: 16 }
            }
          }}
          clearable
          value={status}
          onChange={(v: Status) => changeStatus(v)}
          data={[WAITING, CURRENT, NEW_VOLUMES]}
        />
      </MediaQuery>
    </MediaQuery>
  );
};

export default StatusSelect;
