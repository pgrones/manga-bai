import { Button, MediaQuery } from '@mantine/core';
import Link from 'next/link';
import { FC } from 'react';
import useDevice from '../../lib/hooks/useDevice';
import { LoginButtonProps } from './loginButtonTypes';
import { IoLogInOutline } from 'react-icons/io5';

const LoginButton: FC<LoginButtonProps> = ({ size, fullWidth }) => {
  const phone = useDevice() === 'phone';

  return phone ? (
    <Link href="/signin" passHref legacyBehavior>
      <Button
        size={size}
        component="a"
        fullWidth={fullWidth}
        leftIcon={<IoLogInOutline size={24} />}
        style={{ paddingRight: 8 }}
      >
        <MediaQuery
          query="(max-width: 425px)"
          styles={{ display: fullWidth ? 'inline-block' : 'none !important' }}
        >
          <span style={{ paddingRight: 10 }}>Login with AniList</span>
        </MediaQuery>
      </Button>
    </Link>
  ) : (
    <Button
      size={size}
      fullWidth={fullWidth}
      onClick={() =>
        window.open('/signin', 'Login with AniList', 'height=500,width=500')
      }
      leftIcon={<IoLogInOutline size={24} />}
      style={{ paddingRight: 8 }}
    >
      <MediaQuery
        query="(max-width: 425px)"
        styles={{ display: fullWidth ? 'inline-block' : 'none !important' }}
      >
        <span style={{ paddingRight: 10 }}>Login with AniList</span>
      </MediaQuery>
    </Button>
  );
};

export default LoginButton;
