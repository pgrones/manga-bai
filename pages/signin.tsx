import { Button, Center } from '@mantine/core';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../lib/layout';

const SignIn: NextPage = () => {
  const router = useRouter();
  const { asPath } = useRouter();

  useEffect(() => {
    if (asPath.includes('access_token')) {
      localStorage.setItem(
        'user-token',
        asPath.substring(asPath.indexOf('=') + 1, asPath.indexOf('&'))
      );
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);

  return (
    <Layout>
      <Center>
        <Button
          component="a"
          href="https://anilist.co/api/v2/oauth/authorize?client_id=8372&response_type=token"
        >
          Login with AniList
        </Button>
      </Center>
    </Layout>
  );
};

export default SignIn;
