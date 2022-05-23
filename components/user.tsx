import { Avatar, Button, Popover } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IoChevronDownOutline, IoLogOutOutline } from 'react-icons/io5';
import { useUser } from '../lib/userProvider';

const User = () => {
  const [user, logout] = useUser();
  const [opened, { toggle }] = useDisclosure(false);

  return user ? (
    <Popover
      opened={opened}
      onClose={toggle}
      target={
        <Button
          variant="subtle"
          p={0}
          mt={3}
          color="gray"
          onClick={toggle}
          rightIcon={<IoChevronDownOutline size={18} />}
        >
          <Avatar src={user.avatar.large} />
        </Button>
      }
      styles={{ inner: { padding: 5 } }}
      position="bottom"
      withArrow
    >
      <Button
        variant="subtle"
        color="gray"
        leftIcon={<IoLogOutOutline size={16} />}
        onClick={logout}
      >
        Logout
      </Button>
    </Popover>
  ) : null;
};

export default User;
