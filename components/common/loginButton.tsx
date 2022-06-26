import { Button } from '@mantine/core';
import Link from 'next/link';
import { FC } from 'react';
import useDevice from '../../lib/hooks/useDevice';
import { LoginButtonProps } from './loginButtonTypes';

const LoginButton: FC<LoginButtonProps> = ({ size, fullWidth }) => {
  const phone = useDevice() === 'phone';

  return phone ? (
    <Link href="/signin" passHref>
      <Button size={size} component="a" fullWidth={fullWidth}>
        Login with AniList
      </Button>
    </Link>
  ) : (
    <Button
      size={size}
      fullWidth={fullWidth}
      onClick={() =>
        window.open('/signin', 'Login with AniList', 'height=500,width=500')
      }
    >
      Login with AniList
    </Button>
  );
};

export default LoginButton;
