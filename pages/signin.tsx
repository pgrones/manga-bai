import { Center, Loader, Stack, Title } from '@mantine/core';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from '../lib/hooks/provider/userProvider';

const SignInPage: NextPage = () => {
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
        localStorage.setItem('access_token', token);
        return;
      }
    }

    router.push(
      `https://anilist.co/api/v2/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENTI_ID}&response_type=token`
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
          <Loader />
        </Stack>
      </Center>
    </>
  );
};

export default SignInPage;
