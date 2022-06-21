import { Group, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { areEqual, VariableSizeList as List } from 'react-window';
//@ts-ignore
import { ReactWindowScroller } from 'react-window-scroller';
import { MediaList } from '../../../apollo/queries/mediaListQuery';
import { useMedia } from '../../../lib/hooks/provider/mediaProvider';
import GridEntry from './gridEntry';

const isReactElement = (item: any): item is JSX.Element =>
  React.isValidElement(item);

const Row: React.FC<{
  data: ((MediaList | string)[] | JSX.Element)[];
  index: number;
  style: React.CSSProperties;
}> = React.memo(({ data, index, style }) => {
  const item = data[index];

  return (
    <div style={style}>
      <Group noWrap spacing="xl">
        {isReactElement(item)
          ? item
          : item.map(m =>
              typeof m === 'string' ? (
                <div key={m} style={{ flex: 1 }} />
              ) : (
                <GridEntry key={'grid-entry-' + m.mediaId} {...m} />
              )
            )}
      </Group>
    </div>
  );
}, areEqual);

const VirtualizedGrid: React.FC<{
  statusTitle: JSX.Element;
}> = React.memo(({ statusTitle }) => {
  const { current, waiting } = useMedia();
  const theme = useMantineTheme();
  const xs = 1;
  const sm = useMediaQuery(`(min-width: ${theme.breakpoints.xs}px)`) && 2;
  const md = useMediaQuery(`(min-width: ${theme.breakpoints.md}px)`) && 3;
  const lg = useMediaQuery(`(min-width: ${theme.breakpoints.lg}px)`) && 3;
  const xl = useMediaQuery(`(min-width: ${theme.breakpoints.xl}px)`) && 4;

  const itemData: ((MediaList | string)[] | JSX.Element)[] = [];
  const itemsPerRow = xl || md || sm || xs;
  let statusIndex = -1;

  if (waiting?.length) {
    for (let i = 0; i < waiting.length; i += itemsPerRow) {
      const row: (MediaList | string)[] = waiting.slice(i, i + itemsPerRow);
      for (let i = row.length; i < itemsPerRow; i++) {
        row.push(`waiting${i}`);
      }
      itemData.push(row);
    }
  }

  if (current?.length) {
    if (waiting?.length) {
      statusIndex = itemData.length;
      itemData.push(statusTitle);
    }
    for (let i = 0; i < current.length; i += itemsPerRow) {
      const row: (MediaList | string)[] = current.slice(i, i + itemsPerRow);
      for (let i = row.length; i < itemsPerRow; i++) {
        row.push(`current${i}`);
      }
      itemData.push(row);
    }
  }

  return (
    // Hack to rerender the list on window size changes
    <div
      key={
        itemsPerRow +
        (current?.length ?? 0) +
        (waiting?.length ?? 0) +
        (lg ? 'true' : 'false')
      }
    >
      <ReactWindowScroller>
        {({ ref, outerRef, style, onScroll }: any) => (
          <List
            ref={ref}
            outerRef={outerRef}
            style={style}
            height={window.innerHeight}
            width={0}
            itemCount={itemData.length}
            itemSize={index => (index === statusIndex ? 60 : !lg ? 144 : 194)}
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

export default VirtualizedGrid;
