import { Avatar, Button, Menu } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { Unsubscribe } from 'firebase/database';
import dynamic from 'next/dynamic';
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
    <Menu closeOnClickOutside={closeOnClickOutside}>
      <Menu.Target>
        <Button
          variant="subtle"
          p={0}
          color="gray"
          rightIcon={<IoChevronDownOutline size={18} />}
          title="Settings"
        >
          <Avatar
            src={aniListUser!.avatar.medium}
            alt=""
            style={{ height: 34 }}
          />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {removedMediaData && (
          <Menu.Item
            component={NextLink}
            href="/removedEntries"
            icon={<CgPlayListRemove size={20} />}
          >
            Removed entries
          </Menu.Item>
        )}
        <ColorPickerPopover setCloseOnClickOutside={setCloseOnClickOutside} />
        <Menu.Item icon={<IoLogOutOutline size={16} />} onClick={signOut}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  ) : (
    <LoginButton size="xs" />
  );
};

export default User;
