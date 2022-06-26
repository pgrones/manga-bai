import { Box, Center, SegmentedControl } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { FC } from 'react';
import { IoGrid, IoList } from 'react-icons/io5';
import { Layout } from '../../../lib/types/user';

const LayoutToggle: FC<{ labels?: boolean }> = ({ labels }) => {
  const [layout, setLayout] = useLocalStorage<Layout>({
    key: 'media-layout',
    defaultValue: 'grid',
    getInitialValueInEffect: true
  });

  return (
    <SegmentedControl
      styles={theme => ({
        root: {
          backgroundColor: 'transparent',
          padding: labels ? undefined : 0
        },
        ...(!labels
          ? {
              active: {
                marginTop: 4,
                marginLeft: 4,
                border: `${theme.colorScheme === 'light' ? 1 : 0}px solid ${
                  theme.colors.gray[2]
                }`
              },
              control: {
                height: 30
              },
              label: {
                height: 30
              }
            }
          : {})
      })}
      value={layout}
      onChange={(value: Layout) => setLayout(value)}
      data={[
        {
          label: (
            <Center style={{ height: '100%', width: labels ? undefined : 18 }}>
              <IoList size={24} style={{ minWidth: 24 }} />
              {labels && <Box ml={10}>List</Box>}
            </Center>
          ),
          value: 'list'
        },
        {
          label: (
            <Center style={{ height: '100%' }}>
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
