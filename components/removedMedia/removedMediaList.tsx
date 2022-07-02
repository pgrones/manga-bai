import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FC, memo } from 'react';
import { areEqual, FixedSizeList as List } from 'react-window';
import VirtualizedWindow from '../common/virtualizedWindow';
import { RemovedRowProps } from '../common/virtualizedWindowTypes';
import RemovedMediaEntry from './removedMediaEntry';
import { RemovedMediaListProps } from './removedMediaListTypes';

const Row: FC<RemovedRowProps> = memo(({ data, index, style }) => {
  return (
    <div style={style}>
      <RemovedMediaEntry {...data[index]} />
    </div>
  );
}, areEqual);

const RemovedMediaList: FC<RemovedMediaListProps> = props => {
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.xs}px)`);
  const removedMedia = props.removedMedia.filter(r => !r.hidden);

  return (
    <div key={removedMedia.length + (matches ? 'true' : 'false')}>
      <VirtualizedWindow>
        {({ ref, outerRef, style }) => (
          <List
            ref={ref}
            outerRef={outerRef}
            style={style}
            height={window.innerHeight}
            width={0}
            itemCount={removedMedia.length}
            itemSize={matches ? 55 : 75}
            itemData={removedMedia}
          >
            {Row}
          </List>
        )}
      </VirtualizedWindow>
    </div>
  );
};

export default RemovedMediaList;
