import { Center, Group, SegmentedControl, Select, Title } from '@mantine/core';
import { IoGrid, IoList } from 'react-icons/io5';
import Search from './search';

const Toolbar = () => {
  return (
    <Group
      py="md"
      sx={theme => ({
        position: 'sticky',
        zIndex: 101,
        top: `var(--mantine-header-height, 0px)`,
        marginTop: -theme.spacing.md,
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[1]
      })}
      position="apart"
    >
      <Title order={4}>Waiting For New Volumes</Title>
      <Group>
        <Search />
        <Select
          size="xs"
          placeholder="Status"
          clearable
          data={[
            { label: 'Currently Reading', value: 'CURRENT' },
            { label: 'Wating For New Volumes', value: 'PAUSED' }
          ]}
        />
        <SegmentedControl
          size="xs"
          styles={theme => ({
            root: {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[7]
                  : theme.colors.gray[3],
              height: 31
            }
          })}
          data={[
            {
              label: (
                <Center>
                  <IoList size={18} />
                </Center>
              ),
              value: 'list'
            },
            {
              label: (
                <Center>
                  <IoGrid size={18} />
                </Center>
              ),
              value: 'grid'
            }
          ]}
        />
      </Group>
    </Group>
  );
};

export default Toolbar;
