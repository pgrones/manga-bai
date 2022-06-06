import React, { useRef, useState } from 'react';
import { useMedia } from '../../lib/hooks/mediaProvider';
import { useUser } from '../../lib/hooks/userProvider';
import { Layout } from '../../lib/types/user';
import VirtualizedGrid from './gridLayout/virtualizedGrid';
import VirtualizedList from './listLayout/virtualizedList';
import StatusTitle from './statusTitle';
import Toolbar from './toolbar';

const Manga: React.FC = () => {
  const { current, waiting } = useMedia();
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState(
    waiting ? 'Waiting For New Volumes' : current ? 'Currently Reading' : ''
  );
  const { userData } = useUser();
  const [layout, setLayout] = useState<Layout>(userData?.layout ?? 'grid');
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
          statusTitle={
            <StatusTitle setTitle={setTitle} toolbarRef={toolbarRef} />
          }
        />
      ) : (
        <VirtualizedGrid
          statusTitle={
            <StatusTitle setTitle={setTitle} toolbarRef={toolbarRef} />
          }
        />
      )}
    </>
  );
};

export default Manga;
