import {
  Grid,
  MantineNumberSize,
  MantineSizes,
  Stack,
  Table
} from '@mantine/core';
import React, { useRef, useState } from 'react';
import { MangaData } from '../../lib/hooks/useMangaData';
import EntryGrid from './entryGrid';
import EntryList from './entryLisT';
import StatusTitle from './statusTitle';
import Toolbar from './toolbar';

const isSizes = (
  radius: (string & {}) | MantineNumberSize
): radius is keyof MantineSizes => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
  return typeof radius === 'string' && sizes.includes(radius);
};

const Manga: React.FC<MangaData> = ({ current, waiting }) => {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState('Waiting For New Volumes');
  const [layout, setLayout] = useState<'list' | 'grid'>('grid');

  const isList = layout === 'list';

  return (
    <Stack spacing={0}>
      <Toolbar
        title={title}
        ref={toolbarRef}
        layout={layout}
        setLayout={setLayout}
      />
      {isList ? (
        <>
          {waiting && (
            <Table
              sx={theme => ({
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[7]
                    : theme.white,
                borderRadius: isSizes(theme.defaultRadius)
                  ? theme.radius[theme.defaultRadius]
                  : 'sm'
              })}
            >
              <tbody>
                {waiting.map(w => (
                  <EntryList key={w.mediaId} {...w} />
                ))}
              </tbody>
            </Table>
          )}
          {current && (
            <StatusTitle setTitle={setTitle} toolbarRef={toolbarRef} />
          )}
          {current && (
            <Table
              sx={theme => ({
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[7]
                    : theme.white,
                borderRadius: isSizes(theme.defaultRadius)
                  ? theme.radius[theme.defaultRadius]
                  : 'sm'
              })}
            >
              <tbody>
                {current.map(c => (
                  <EntryList key={c.mediaId} {...c} />
                ))}
              </tbody>
            </Table>
          )}
        </>
      ) : (
        <Grid gutter="xl" mb="xl">
          {waiting?.map(w => (
            <Grid.Col key={w.mediaId} xs={12} md={6} lg={4}>
              <EntryGrid {...w} />
            </Grid.Col>
          ))}
          {current && (
            <Grid.Col>
              <StatusTitle setTitle={setTitle} toolbarRef={toolbarRef} />
            </Grid.Col>
          )}
          {current?.map(c => (
            <Grid.Col key={c.mediaId} xs={12} md={6} lg={4}>
              <EntryGrid {...c} />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Stack>
  );
};

export default Manga;
