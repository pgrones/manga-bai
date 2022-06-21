import { Button, MantineSize } from '@mantine/core';
import { useOs } from '@mantine/hooks';
import Link from 'next/link';

const LoginButton: React.FC<{ size: MantineSize; fullWidth?: boolean }> = ({
  size,
  fullWidth
}) => {
  const os = useOs();
  const phone = ['ios', 'android'].includes(os);

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
