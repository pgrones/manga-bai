import { Grid, Stack, Title } from '@mantine/core';
import React from 'react';
import { MangaData } from '../../lib/hooks/useMangaData';
import Manga from './manga';
import Toolbar from './toolbar';

const List: React.FC<MangaData> = ({ current, waiting }) => {
  return (
    <Stack spacing={0}>
      <Toolbar />
      <Grid gutter="xl" mb="xl">
        {waiting?.map(w => (
          <Grid.Col xs={12} md={6} lg={4} key={w.mediaId}>
            <Manga {...w} />
          </Grid.Col>
        ))}
        {current && (
          <Grid.Col>
            <Title pt="xl" order={4}>
              Currently Reading
            </Title>
          </Grid.Col>
        )}
        {current?.map(c => (
          <Grid.Col xs={12} md={6} lg={4} key={c.mediaId}>
            <Manga {...c} />
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
};

export default List;
