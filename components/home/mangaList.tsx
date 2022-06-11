import React, { Suspense, useEffect, useRef, useState } from 'react';
import { CURRENT, WAITING } from '../../lib/helper/constants';
import { useMedia } from '../../lib/hooks/provider/mediaProvider';
import LoadingIndicator from '../common/loadingIndicator';
import StatusTitle from './statusTitle';
import Toolbar from './toolbar/toolbar';

const VirtualizedList = React.lazy(
  () => import('./listLayout/virtualizedList')
);

const VirtualizedGrid = React.lazy(
  () => import('./gridLayout/virtualizedGrid')
);

const MangaList: React.FC = () => {
  const { current, waiting, layout } = useMedia();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const isList = layout === 'list';
  const [title, setTitle] = useState(
    waiting?.length ? WAITING : current?.length ? CURRENT : ''
  );

  useEffect(() => {
    setTitle(waiting?.length ? WAITING : current?.length ? CURRENT : '');
  }, [current, waiting]);

  return (
    <>
      <Toolbar title={title} ref={toolbarRef} />
      {isList ? (
        <Suspense fallback={<LoadingIndicator />}>
          <VirtualizedList
            statusTitle={
              <StatusTitle setTitle={setTitle} toolbarRef={toolbarRef} />
            }
          />
        </Suspense>
      ) : (
        <Suspense fallback={<LoadingIndicator />}>
          <VirtualizedGrid
            statusTitle={
              <StatusTitle setTitle={setTitle} toolbarRef={toolbarRef} />
            }
          />
        </Suspense>
      )}
    </>
  );
};

export default MangaList;
