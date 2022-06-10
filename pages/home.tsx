import type { NextPage } from 'next';
import Head from 'next/head';
import AuthCheck from '../components/common/authCheck';
import Layout from '../components/common/layout';
import LoadingIndicator from '../components/common/loadingIndicator';
import Kanna from '../components/home/kanna';
import Manga from '../components/home/manga';
import NoData from '../components/home/noData';
import MediaProvider from '../lib/hooks/mediaProvider';
import useInitialData from '../lib/hooks/useInitialData';

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home · Manga Bai</title>
      </Head>
      <Layout>
        <AuthCheck>
          <HomeComponent />
        </AuthCheck>
      </Layout>
      <Kanna />
    </>
  );
};

export default HomePage;

const HomeComponent: React.FC = () => {
  const { manga, loading, error } = useInitialData();

  return error ? null : loading ? (
    <LoadingIndicator />
  ) : !manga.current?.length && !manga.waiting?.length ? (
    <NoData />
  ) : (
    <MediaProvider mediaLists={manga}>
      <Manga />
    </MediaProvider>
  );
};
