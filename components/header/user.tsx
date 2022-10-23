import { Avatar, Badge, Button, Menu } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { Unsubscribe } from 'firebase/database';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { CgPlayListRemove } from 'react-icons/cg';
import { IoChevronDownOutline, IoLogOutOutline } from 'react-icons/io5';
import { VscHistory } from 'react-icons/vsc';
import {
  hasRemovedMediaData,
  setLastChangesCheck
} from '../../lib/firebase/db';
import { LAST_CHANGE } from '../../lib/helper/constants';
import { useUser } from '../../lib/hooks/provider/userProvider';
import useNotification from '../../lib/hooks/useNotification';
import ColorPickerPopover from './colorPicker';

const LoginButton = dynamic(() => import('../common/loginButton'), {
  ssr: false
});

const User = () => {
  const { fullyAuthenticated, aniListUser, firebaseUser, signOut, userData } =
    useUser();
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
          px={0}
          color="gray"
          rightIcon={<IoChevronDownOutline size={18} />}
          title="Settings"
          style={{ position: 'relative' }}
        >
          {userData?.onboardingDone &&
            (!userData.lastChangesCheck ||
              userData.lastChangesCheck <=
                new Date(LAST_CHANGE).getMilliseconds()) && (
              <Badge
                variant="filled"
                size="sm"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translate(-50%, 50%)',
                  zIndex: 100
                }}
              >
                new
              </Badge>
            )}
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
        <Menu.Item
          component={NextLink}
          href="/changelog"
          icon={<VscHistory size={16} />}
          onClick={() => firebaseUser && setLastChangesCheck(firebaseUser.uid)}
        >
          Changelog{' '}
          {userData?.onboardingDone &&
            (!userData.lastChangesCheck ||
              userData.lastChangesCheck <=
                new Date(LAST_CHANGE).getMilliseconds()) && (
              <Badge variant="filled" size="sm">
                new
              </Badge>
            )}
        </Menu.Item>
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
