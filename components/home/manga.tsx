import { Grid } from '@mantine/core';
import React, { useRef, useState } from 'react';
import { Status } from '../../apollo/queries/mediaQuery';
import { MangaData } from '../../lib/hooks/useMangaData';
import GridEntry from './gridLayout/gridEntry';
import StatusTitle from './statusTitle';
import Toolbar from './toolbar';
import VirtualizedList from './listLayout/virtualizedList';

export interface UpdatedValues {
  status?: Status;
  progressVolumes?: number;
  progress?: number;
}

const Manga: React.FC<MangaData> = props => {
  const { current, waiting } = props;
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState('Waiting For New Volumes');
  const [layout, setLayout] = useState<'list' | 'grid'>('list');

  const isList = layout === 'list';

  return (
    <>
      <Toolbar
        title={title}
        ref={toolbarRef}
        layout={layout}
        setLayout={setLayout}
      />
      {isList ? (
        <VirtualizedList
          {...props}
          statusTitle={
            <StatusTitle setTitle={setTitle} toolbarRef={toolbarRef} />
          }
        />
      ) : (
        <Grid gutter="xl" mb="xl">
          {waiting?.map(w => (
            <Grid.Col key={w.mediaId} xs={12} sm={6} lg={4} xl={3}>
              <GridEntry {...w} />
            </Grid.Col>
          ))}
          {current && (
            <Grid.Col>
              <StatusTitle setTitle={setTitle} toolbarRef={toolbarRef} />
            </Grid.Col>
          )}
          {current?.map(c => (
            <Grid.Col key={c.mediaId} xs={12} sm={6} lg={4} xl={3}>
              <GridEntry {...c} />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Manga;
