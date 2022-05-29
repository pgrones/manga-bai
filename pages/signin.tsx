import { Center, Loader, Stack, Title } from '@mantine/core';
import { signInAnonymously } from 'firebase/auth';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { auth } from '../lib/firebase/firebase';
import { useUser } from '../lib/hooks/userProvider';

const SigninPage: NextPage = () => {
  const { fullyAuthenticated } = useUser();
  const router = useRouter();
  const { asPath } = router;

  useEffect(() => {
    if (fullyAuthenticated === true) {
      window.close();
      router.push('/home');
      return;
    }

    if (asPath.includes('access_token')) {
      const token = new URLSearchParams(asPath.split('#')[1]).get(
        'access_token'
      );

      if (token) {
        (async () => {
          try {
            await signInAnonymously(auth);
            localStorage.setItem('access_token', token);
            window.close();
            router.push('/home');
          } catch (error) {
            console.log(error);
          }
        })();

        return;
      }
    }

    router.push(
      'https://anilist.co/api/v2/oauth/authorize?client_id=8372&response_type=token'
    );
  }, [asPath, fullyAuthenticated]);

  return (
    <>
      <Head>
        <title>Login with AniList</title>
      </Head>

      <Center style={{ height: '100vh' }}>
        <Stack align="center">
          <Title order={4}>Connecting to AniList</Title>
          <Loader variant="bars" />
        </Stack>
      </Center>
    </>
  );
};

export default SigninPage;
