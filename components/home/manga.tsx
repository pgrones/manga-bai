import React, { useRef, useState } from 'react';
import { useUser } from '../../lib/hooks/userProvider';
import { IMediaLists } from '../../lib/types/entry';
import { Layout } from '../../lib/types/user';
import VirtualizedGrid from './gridLayout/virtualizedGrid';
import VirtualizedList from './listLayout/virtualizedList';
import StatusTitle from './statusTitle';
import Toolbar from './toolbar';

const Manga: React.FC<IMediaLists> = props => {
  const { current, waiting } = props;
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
