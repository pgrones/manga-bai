import { Center, SegmentedControl } from '@mantine/core';
import { IoGrid, IoList } from 'react-icons/io5';
import { useMedia } from '../../../lib/hooks/mediaProvider';
import { Layout } from '../../../lib/types/user';

const LayoutToggle = () => {
  const { layout, setLayout } = useMedia();

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
  );
};

export default LayoutToggle;
