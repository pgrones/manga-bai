import { Group, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FC, isValidElement, memo } from 'react';
import { areEqual, VariableSizeList as List } from 'react-window';
import { MediaList } from '../../../apollo/queries/mediaListQuery';
import {
  isCurrentMedia,
  isWaitingMedia
} from '../../../lib/helper/mediaHelper';
import { useMedia } from '../../../lib/hooks/provider/mediaProvider';
import VirtualizedWindow from '../../common/virtualizedWindow';
import {
  GridRowProps,
  VirtualizedProps
} from '../../common/virtualizedWindowTypes';
import GridEntry from './gridEntry';

const isReactElement = (item: any): item is JSX.Element => isValidElement(item);

const Row: FC<GridRowProps> = memo(({ data, index, style }) => {
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

const VirtualizedGrid: FC<VirtualizedProps> = memo(({ statusTitle }) => {
  const { media, status } = useMedia();
  const theme = useMantineTheme();
  const xs = 1;
  const sm = useMediaQuery(`(min-width: ${theme.breakpoints.xs}px)`) && 2;
  const md = useMediaQuery(`(min-width: ${theme.breakpoints.md}px)`) && 3;
  const lg = useMediaQuery(`(min-width: ${theme.breakpoints.lg}px)`) && 3;
  const xl = useMediaQuery(`(min-width: ${theme.breakpoints.xl}px)`) && 4;

  const itemData: ((MediaList | string)[] | JSX.Element)[] = [];
  const itemsPerRow = xl || md || sm || xs;
  let statusIndex = -1;

  const current =
    status !== 'Waiting For New Volumes'
      ? media?.filter(m => isCurrentMedia(m) && !m.hidden)
      : undefined;
  const waiting =
    status !== 'Currently Reading'
      ? media?.filter(m => isWaitingMedia(m) && !m.hidden)
      : undefined;

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
        (current?.length ?? 0).toString() +
        (waiting?.length ?? 0).toString() +
        (itemData.length ?? 0).toString() +
        (lg ? 'true' : 'false')
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
            itemCount={itemData.length}
            itemSize={index =>
              index === statusIndex
                ? 60
                : !lg
                ? 120 + theme.spacing.md
                : 170 + theme.spacing.xl
            }
            itemData={itemData}
          >
            {Row}
          </List>
        )}
      </VirtualizedWindow>
    </div>
  );
});

export default VirtualizedGrid;
