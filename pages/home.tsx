import { Center, Loader, Image } from '@mantine/core';
import type { NextPage } from 'next';
import AuthCheck from '../components/authCheck';
import List from '../components/home/list';
import Layout from '../components/layout';
import useMangaData from '../lib/hooks/useMangaData';

const HomePage: NextPage = () => {
  return (
    <>
      <Layout>
        <AuthCheck>
          <HomeComponent />
        </AuthCheck>
      </Layout>
      {new Date().getDate() === 1 && (
        <Image
          src="https://cdn.discordapp.com/emojis/295269590219489290.png?v=1"
          alt="Kanna"
          height={80}
          width="auto"
          style={{
            position: 'fixed',
            top: 'calc(100vh - 80px)',
            left: 10,
            zIndex: 500,
            transform: 'scaleX(-1)'
          }}
        />
      )}
    </>
  );
};

export default HomePage;

const HomeComponent: React.FC = () => {
  const { manga, loading, error } = useMangaData();

  return error ? null : loading ? (
    <Center
      style={{
        height: 'calc(100vh - var(--mantine-header-height))',
        marginTop: 'var(--mantine-header-height)'
      }}
    >
      <Loader variant="bars" />
    </Center>
  ) : (
    <List {...manga!} />
  );
};
