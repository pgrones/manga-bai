import { useQuery } from '@apollo/client';
import { Grid } from '@mantine/core';
import type { NextPage } from 'next';
import listQuery, { ListQueryData } from '../apollo/queries/listQuery';
import Manga from '../components/manga';
import Layout from '../lib/layout';
import { useUser } from '../lib/userProvider';

const Home: NextPage = () => {
  const [user] = useUser();
  const { data } = useQuery<ListQueryData>(listQuery, {
    variables: { userId: user?.id },
    skip: !user
  });

  const current = data?.Page.mediaList.filter(m => m.status === 'CURRENT');
  const paused = data?.Page.mediaList.filter(m => m.status === 'PAUSED');

  return (
    <Layout>
      <Grid>
        {current?.map(c => (
          <Grid.Col xs={12} sm={6} md={4} key={c.mediaId}>
            <Manga {...c} />
          </Grid.Col>
        ))}
        {paused?.map(p => (
          <Grid.Col xs={12} sm={6} md={4} key={p.mediaId}>
            <Manga {...p} />
          </Grid.Col>
        ))}
      </Grid>
    </Layout>
  );
};

export default Home;
