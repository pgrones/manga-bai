import { Button, Modal, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';

const Edit = () => {
  const [opened, { toggle }] = useDisclosure(false);
  return (
    <>
      <Button variant="light" onClick={toggle}>
        Edit
      </Button>
      <Modal opened={opened} onClose={toggle}>
        <Select
          //   value={value}
          //   onChange={(value: Status | null) => setValue(value)}
          data={[
            { label: 'Reading', value: 'CURRENT' },
            { label: 'Wating for new volumes', value: 'PAUSED' }
          ]}
          //   rightSection={<Loader variant="bars" size="xs" />}
          //   disabled
        />
      </Modal>
    </>
  );
};

export default Edit;
