import type { NextPage } from 'next';
import Head from 'next/head';
import AuthCheck from '../components/common/authCheck';
import Layout from '../components/common/layout';
import LoadingIndicator from '../components/common/loadingIndicator';
import Kanna from '../components/home/kanna';
import MangaList from '../components/home/mangaList';
import NoData from '../components/home/noData';
import Steps from '../components/onboarding/steps';
import MediaProvider from '../lib/hooks/provider/mediaProvider';
import OnboardingProvider from '../lib/hooks/provider/onboardingProvider';
import useInitialization from '../lib/hooks/useInitialization';

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

const HomeComponent = () => {
  const initialData = useInitialization();
  const { error, loading, onboardingDone, mediaLists } = initialData;

  if (error) return null;
  if (loading || (onboardingDone && !mediaLists)) return <LoadingIndicator />;

  if (!onboardingDone)
    return (
      <OnboardingProvider {...initialData}>
        <Steps />
      </OnboardingProvider>
    );

  if (!mediaLists?.current?.length && !mediaLists?.waiting?.length)
    return <NoData />;

  return (
    <MediaProvider mediaLists={mediaLists}>
      <MangaList />
    </MediaProvider>
  );
};
