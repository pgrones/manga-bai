import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { CURRENT, WAITING } from '../../lib/helper/constants';
import { isCurrentMedia, isWaitingMedia } from '../../lib/helper/mediaHelper';
import { useMedia } from '../../lib/hooks/provider/mediaProvider';
import LoadingIndicator from '../common/loadingIndicator';
import StatusTitle from './statusTitle';
import Toolbar from './toolbar/toolbar';

const VirtualizedList = lazy(() => import('./listLayout/virtualizedList'));

const VirtualizedGrid = lazy(() => import('./gridLayout/virtualizedGrid'));

const MangaList = () => {
  const { media, status, layout } = useMedia();
  const current =
    status !== 'Waiting For New Volumes' &&
    media?.filter(m => isCurrentMedia(m) && !m.hidden).length;
  const waiting =
    status !== 'Currently Reading' &&
    media?.filter(m => isWaitingMedia(m) && !m.hidden).length;
  const toolbarRef = useRef<HTMLDivElement>(null);
  const isList = layout === 'list';
  const [title, setTitle] = useState(
    waiting ? WAITING : current ? CURRENT : ''
  );

  useEffect(() => {
    setTitle(waiting ? WAITING : current ? CURRENT : '');
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
