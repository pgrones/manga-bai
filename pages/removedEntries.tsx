import { Container } from '@mantine/core';
import { NextPage } from 'next';
import Layout from '../components/common/layout';
import RemovedMediaList from '../components/removedMedia/removedMediaList';

const RemovedEntries: NextPage = () => {
  return (
    <Layout>
      <Container size="xs" p={0}>
        <RemovedMediaList />
      </Container>
    </Layout>
  );
};

export default RemovedEntries;
