import { NextPage } from 'next';
import Head from 'next/head';
import AuthCheck from '../components/common/authCheck';
import Layout from '../components/common/layout';
import RemovedMedia from '../components/removedMedia/removedMedia';

const RemovedEntries: NextPage = () => {
  return (
    <>
      <Head>
        <title>Removed Entries · Manga Bai</title>
      </Head>
      <Layout>
        <AuthCheck>
          <RemovedMedia />
        </AuthCheck>
      </Layout>
    </>
  );
};

export default RemovedEntries;
