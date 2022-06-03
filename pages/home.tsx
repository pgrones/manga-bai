import type { NextPage } from 'next';
import Image from 'next/image';
import AuthCheck from '../components/common/authCheck';
import Layout from '../components/common/layout';
import LoadingIndicator from '../components/common/loadingIndicator';
import Manga from '../components/home/manga';
import useMangaData from '../lib/hooks/useMangaData';
import kanna from '../public/kanna.png';

const HomePage: NextPage = () => {
  return (
    <>
      <Layout>
        <AuthCheck>
          <HomeComponent />
        </AuthCheck>
      </Layout>
      {[1, 10, 20].includes(new Date().getDate()) && (
        <div className="kanna">
          <Image src={kanna} alt="Kanna" />
        </div>
      )}
    </>
  );
};

export default HomePage;

const HomeComponent: React.FC = () => {
  const { manga, loading, error } = useMangaData();

  return error ? null : loading ? <LoadingIndicator /> : <Manga {...manga!} />;
};
