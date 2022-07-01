import { Avatar, Button, Popover, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Unsubscribe } from 'firebase/database';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CgPlayListRemove } from 'react-icons/cg';
import { IoChevronDownOutline, IoLogOutOutline } from 'react-icons/io5';
import { hasRemovedMediaData } from '../../lib/firebase/db';
import { useUser } from '../../lib/hooks/provider/userProvider';
import useNotification from '../../lib/hooks/useNotification';
import ColorPickerPopover from './colorPicker';

const LoginButton = dynamic(() => import('../common/loginButton'), {
  ssr: false
});

const User = () => {
  const { fullyAuthenticated, aniListUser, firebaseUser, signOut } = useUser();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [closeOnClickOutside, setCloseOnClickOutside] = useState(true);
  const [removedMediaData, setRemovedMediaData] = useState(false);
  const { showError } = useNotification();

  useEffect(() => {
    let unsubscribe: Unsubscribe | void;
    if (firebaseUser) {
      try {
        unsubscribe = hasRemovedMediaData(
          firebaseUser.uid,
          setRemovedMediaData
        );
      } catch (error) {
        showError(error);
      }
    } else {
      setRemovedMediaData(false);
    }

    return unsubscribe;
  }, [firebaseUser]);

  return fullyAuthenticated === true ? (
    <Popover
      opened={opened}
      onClose={close}
      transition="scale-y"
      closeOnClickOutside={closeOnClickOutside}
      target={
        <Button
          variant="subtle"
          p={0}
          mt={5}
          color="gray"
          onClick={toggle}
          rightIcon={<IoChevronDownOutline size={18} />}
          title="Settings"
        >
          <Avatar
            src={aniListUser!.avatar.medium}
            alt=""
            style={{ height: 34 }}
          />
        </Button>
      }
      styles={{ inner: { padding: 5 } }}
      position="bottom"
      withArrow
    >
      <Stack spacing={0}>
        {removedMediaData && (
          <Link href="/removedEntries" passHref>
            <Button
              variant="subtle"
              color="gray"
              component="a"
              leftIcon={<CgPlayListRemove size={20} />}
              styles={{
                inner: { justifyContent: 'flex-start' },
                leftIcon: { marginLeft: -2, marginRight: 8 }
              }}
            >
              Removed entries
            </Button>
          </Link>
        )}
        <ColorPickerPopover setCloseOnClickOutside={setCloseOnClickOutside} />
        <Button
          variant="subtle"
          color="gray"
          leftIcon={<IoLogOutOutline size={16} />}
          onClick={signOut}
          styles={{ inner: { justifyContent: 'flex-start' } }}
        >
          Logout
        </Button>
      </Stack>
    </Popover>
  ) : (
    <LoginButton size="xs" />
  );
};

export default User;
