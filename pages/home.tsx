import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
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
import { IMediaLists } from '../lib/types/entry';

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
  const [mediaLists, setMediaLists] = useState<IMediaLists>();
  const initialData = useInitialization(setMediaLists);
  const { error, loading, onboardingDone } = initialData;

  return error ? null : loading || (onboardingDone && !mediaLists) ? (
    <LoadingIndicator />
  ) : !onboardingDone ? (
    <OnboardingProvider setMediaLists={setMediaLists} {...initialData}>
      <Steps />
    </OnboardingProvider>
  ) : !mediaLists?.current?.length && !mediaLists?.waiting?.length ? (
    <NoData />
  ) : (
    <MediaProvider mediaLists={mediaLists}>
      <MangaList />
    </MediaProvider>
  );
};
