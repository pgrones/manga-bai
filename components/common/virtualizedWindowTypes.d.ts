import { CSSProperties, FC } from 'react';
import { MediaList } from '../../../apollo/queries/mediaListQuery';
import { RemovedMediaEntry } from '../removedMedia/removedMediaTypes';

export interface VirtualizedProps {
  statusTitle: JSX.Element;
}

export interface GridRowProps {
  data: ((MediaList | string)[] | JSX.Element)[];
  index: number;
  style: CSSProperties;
}

export interface ListRowProps {
  data: (MediaList | JSX.Element)[];
  index: number;
  style: CSSProperties;
}

export interface RemovedRowProps {
  data: RemovedMediaEntry[];
  index: number;
  style: CSSProperties;
}

export interface VirtualizedWindowProps {
  children: FC<{ ref: any; outerRef: any; style: CSSProperties }>;
}
