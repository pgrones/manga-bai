import { Center, SegmentedControl } from '@mantine/core';
import { IoGrid, IoList } from 'react-icons/io5';
import { setUserData } from '../../../lib/firebase/db';
import { useMedia } from '../../../lib/hooks/mediaProvider';
import { useUser } from '../../../lib/hooks/userProvider';
import { Layout } from '../../../lib/types/user';

const LayoutToggle = () => {
  const { firebaseUser } = useUser();
  const { layout, setLayout } = useMedia();
  const onLayoutChange = (value: Layout) => {
    setUserData(firebaseUser!.uid, { layout: value });
    setLayout(value);
  };

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
      onChange={onLayoutChange}
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
