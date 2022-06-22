import { Container } from '@mantine/core';
import { NextPage } from 'next';
import Head from 'next/head';
import AuthCheck from '../components/common/authCheck';
import Layout from '../components/common/layout';
import RemovedMediaList from '../components/removedMedia/removedMediaList';

const RemovedEntries: NextPage = () => {
  return (
    <>
      <Head>
        <title>Removed Entries · Manga Bai</title>
      </Head>
      <Layout>
        <AuthCheck>
          <Container size="xs" p={0}>
            <RemovedMediaList />
          </Container>
        </AuthCheck>
      </Layout>
    </>
  );
};

export default RemovedEntries;
