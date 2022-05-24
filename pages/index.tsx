import { Button, Center } from '@mantine/core';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../lib/layout';
import { useUser } from '../lib/userProvider';

const LandingPage: NextPage = () => {
  const [user] = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/home');
    }
  }, [user]);

  return (
    <Layout>
      <Center>
        <Button
          onClick={() =>
            window.open('/signin', 'Login with AniList', 'height=500,width=500')
          }
        >
          Login with AniList
        </Button>
      </Center>
    </Layout>
  );
};

export default LandingPage;
