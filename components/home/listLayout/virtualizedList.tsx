import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FC, isValidElement, memo } from 'react';
import { areEqual, FixedSizeList as List } from 'react-window';
import { MediaList } from '../../../apollo/queries/mediaListQuery';
import {
  isCurrentMedia,
  isWaitingMedia
} from '../../../lib/helper/mediaHelper';
import { useMedia } from '../../../lib/hooks/provider/mediaProvider';
import VirtualizedWindow from '../../common/virtualizedWindow';
import {
  ListRowProps,
  VirtualizedProps
} from '../../common/virtualizedWindowTypes';
import ListEntry from './listEntry';

const Row: FC<ListRowProps> = memo(({ data, index, style }) => {
  const item = data[index];
  const topRadius = index === 0 || isValidElement(data[index - 1]);
  const bottomRadius =
    index === data.length - 1 || isValidElement(data[index + 1]);

  return (
    <div style={style}>
      {isValidElement(item) ? (
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

const VirtualizedList: FC<VirtualizedProps> = memo(({ statusTitle }) => {
  const { media, status } = useMedia();
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.xs}px)`);

  const current =
    status !== 'Waiting For New Volumes'
      ? media?.filter(m => isCurrentMedia(m) && !m.hidden)
      : undefined;
  const waiting =
    status !== 'Currently Reading'
      ? media?.filter(m => isWaitingMedia(m) && !m.hidden)
      : undefined;

  const itemData: (MediaList | JSX.Element)[] = [
    ...(waiting ?? []),
    ...(waiting?.length && current?.length ? [statusTitle] : []),
    ...(current ?? [])
  ];

  return (
    <div
      key={
        (current?.length ?? 0).toString() +
        (waiting?.length ?? 0).toString() +
        (itemData.length ?? 0).toString() +
        (matches ? 'true' : 'false')
      }
    >
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
