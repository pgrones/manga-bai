import { Center, Grid, Loader } from '@mantine/core';
import type { NextPage } from 'next';
import Manga from '../components/manga';
import useMangaData from '../lib/hooks/useMangaData';
import Layout from '../lib/layout';

const Home: NextPage = () => {
  const { manga, loading, error } = useMangaData();

  return (
    <Layout>
      {error ? null : loading ? (
        <Center
          style={{
            height: 'calc(100vh - var(--mantine-header-height))',
            marginTop: 'var(--mantine-header-height)'
          }}
        >
          <Loader variant="bars" />
        </Center>
      ) : (
        <Grid>
          {manga?.current?.map(c => (
            <Grid.Col xs={12} md={6} lg={4} key={c.mediaId}>
              <Manga {...c} />
            </Grid.Col>
          ))}
          {manga?.waiting?.map(w => (
            <Grid.Col xs={12} md={6} lg={4} key={w.mediaId}>
              <Manga {...w} />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Layout>
  );
};

export default Home;
