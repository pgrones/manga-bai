import { Image } from '@mantine/core';
import type { NextPage } from 'next';
import AuthCheck from '../components/common/authCheck';
import LoadingIndicator from '../components/common/loadingIndicator';
import Manga from '../components/home/manga';
import Layout from '../components/common/layout';
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

  return error ? null : loading ? <LoadingIndicator /> : <Manga {...manga!} />;
};
