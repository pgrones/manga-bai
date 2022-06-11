import { Box, Center, SegmentedControl } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { IoGrid, IoList } from 'react-icons/io5';
import { Layout } from '../../../lib/types/user';

const LayoutToggle: React.FC<{ labels?: boolean }> = ({ labels }) => {
  const [layout, setLayout] = useLocalStorage<Layout>({
    key: 'media-layout',
    defaultValue: 'grid',
    getInitialValueInEffect: true
  });

  return (
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
      value={layout}
      onChange={(value: Layout) => setLayout(value)}
      data={[
        {
          label: (
            <Center>
              <IoList size={18} />
              {labels && <Box ml={10}>List</Box>}
            </Center>
          ),
          value: 'list'
        },
        {
          label: (
            <Center>
              <IoGrid size={18} />
              {labels && <Box ml={10}>Grid</Box>}
            </Center>
          ),
          value: 'grid'
        }
      ]}
    />
  );
};

export default LayoutToggle;
