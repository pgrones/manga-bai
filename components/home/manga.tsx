import React, { useRef, useState } from 'react';
import { Status } from '../../apollo/queries/mediaQuery';
import { MangaData } from '../../lib/hooks/useMangaData';
import VirtualizedGrid from './gridLayout/virtualizedGrid';
import VirtualizedList from './listLayout/virtualizedList';
import StatusTitle from './statusTitle';
import Toolbar from './toolbar';

export interface UpdatedValues {
  status?: Status;
  progressVolumes?: number;
  progress?: number;
}

const Manga: React.FC<MangaData> = props => {
  const { current, waiting } = props;
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState(
    waiting ? 'Waiting For New Volumes' : current ? 'Currently Reading' : ''
  );
  const [layout, setLayout] = useState<'list' | 'grid'>('grid');

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
        <VirtualizedGrid
          {...props}
          statusTitle={
            <StatusTitle setTitle={setTitle} toolbarRef={toolbarRef} />
          }
        />
      )}
    </>
  );
};

export default Manga;
