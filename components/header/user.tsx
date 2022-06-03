import { Avatar, Button, Popover, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { IoChevronDownOutline, IoLogOutOutline } from 'react-icons/io5';
import { useUser } from '../../lib/hooks/userProvider';
import ColorPicker from './colorPicker';

const User = () => {
  const { fullyAuthenticated, aniListUser, signOut: singOut } = useUser();
  const [opened, { toggle }] = useDisclosure(false);
  const [closeOnClickOutside, setCloseOnClickOutside] = useState(true);

  return fullyAuthenticated === true ? (
    <Popover
      opened={opened}
      onClose={toggle}
      transition="scale-y"
      closeOnClickOutside={closeOnClickOutside}
      target={
        <Button
          variant="subtle"
          p={0}
          mt={3}
          color="gray"
          onClick={toggle}
          rightIcon={<IoChevronDownOutline size={18} />}
        >
          <Avatar src={aniListUser?.avatar.large} style={{ height: 34 }} />
        </Button>
      }
      styles={{ inner: { padding: 5 } }}
      position="bottom"
      withArrow
    >
      <Stack spacing={0}>
        <ColorPicker setCloseOnClickOutside={setCloseOnClickOutside} />
        <Button
          variant="subtle"
          color="gray"
          leftIcon={<IoLogOutOutline size={16} />}
          onClick={singOut}
          styles={{ inner: { justifyContent: 'flex-start' } }}
        >
          Logout
        </Button>
      </Stack>
    </Popover>
  ) : (
    <Button
      onClick={() =>
        window.open('/signin', 'Login with AniList', 'height=500,width=500')
      }
    >
      Login with AniList
    </Button>
  );
};

export default User;
