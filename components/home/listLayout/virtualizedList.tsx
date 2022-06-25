import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { areEqual, FixedSizeList as List } from 'react-window';
import { MediaList } from '../../../apollo/queries/mediaListQuery';
import {
  isCurrentMedia,
  isWaitingMedia
} from '../../../lib/helper/mediaHelper';
import { useMedia } from '../../../lib/hooks/provider/mediaProvider';
import VirtualizedWindow from '../../common/virtualizedWindow';
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
  const { media } = useMedia();
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.xs}px)`);

  const current = media?.filter(isCurrentMedia);
  const waiting = media?.filter(isWaitingMedia);

  const itemData: (MediaList | JSX.Element)[] = [
    ...(waiting ?? []),
    ...(waiting?.length && current?.length ? [statusTitle] : []),
    ...(current ?? [])
  ];

  return (
    <div key={Math.random()}>
      <VirtualizedWindow>
        {({ ref, outerRef, style }) => (
          <List
            ref={ref}
            outerRef={outerRef}
            style={style}
            height={window.innerHeight}
            width={0}
            overscanCount={10}
            itemCount={itemData.length}
            itemSize={matches ? 55 : 75}
            itemData={itemData}
          >
            {Row}
          </List>
        )}
      </VirtualizedWindow>
    </div>
  );
});

export default VirtualizedList;
