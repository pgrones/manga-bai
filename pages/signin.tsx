import { Center, Loader, Stack, Title } from '@mantine/core';
import axios from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Signin: NextPage = () => {
  const router = useRouter();
  const { asPath } = router;

  useEffect(() => {
    // if (localStorage.getItem('access_token')) {
    //   window.close();
    //   router.push('/home');
    //   return;
    // }

    if (asPath.includes('access_token')) {
      const token = new URLSearchParams(
        asPath.substring(asPath.indexOf('#') + 1)
      ).get('access_token');
      if (token) {
        debugger;
        axios.post(`/api/user`, { accessToken: token });
        // localStorage.setItem('access_token', token);
        // window.close();
      }
    }

    router.push(
      'https://anilist.co/api/v2/oauth/authorize?client_id=8372&response_type=token'
    );
  }, [asPath]);

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

export default Signin;
