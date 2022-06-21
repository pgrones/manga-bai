import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { areEqual, FixedSizeList as List } from 'react-window';
//@ts-ignore
import { ReactWindowScroller } from 'react-window-scroller';
import { MediaList } from '../../../apollo/queries/mediaListQuery';
import { useMedia } from '../../../lib/hooks/provider/mediaProvider';
import ListEntry from './listEntry';

const Row: React.FC<{
  data: (MediaList | JSX.Element)[];
  index: number;
  style: React.CSSProperties;
}> = React.memo(({ data, index, style }) => {
  const item = data[index];
  const topRadius = index === 0 || React.isValidElement(data[index - 1]);
  const bottomRadius =
    index === data.length - 1 || React.isValidElement(data[index + 1]);

  return (
    <div style={style}>
      {React.isValidElement(item) ? (
        item
      ) : (
        <ListEntry
          {...(item as MediaList)}
          topRadius={topRadius}
          bottomRadius={bottomRadius}
        />
      )}
    </div>
  );
}, areEqual);

const VirtualizedList: React.FC<{
  statusTitle: JSX.Element;
}> = React.memo(({ statusTitle }) => {
  const { current, waiting } = useMedia();
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.xs}px)`);

  const itemData: (MediaList | JSX.Element)[] = [
    ...(waiting ?? []),
    ...(waiting?.length && current?.length ? [statusTitle] : []),
    ...(current ?? [])
  ];

  return (
    <div
      key={
        (current?.length ?? 0) +
        (waiting?.length ?? 0) +
        (matches ? 'true' : 'false')
      }
    >
      <ReactWindowScroller>
        {({ ref, outerRef, style, onScroll }: any) => (
          <List
            ref={ref}
            outerRef={outerRef}
            style={style}
            height={window.innerHeight}
            itemCount={itemData.length}
            itemSize={matches ? 55 : 75}
            width={0}
            itemData={itemData}
            onScroll={onScroll}
          >
            {Row}
          </List>
        )}
      </ReactWindowScroller>
    </div>
  );
});

export default VirtualizedList;
