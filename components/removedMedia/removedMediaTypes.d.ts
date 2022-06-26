import { Media } from '../../apollo/queries/removedMediaQuery';

export interface RemovedMediaEntry extends Media {
  undoRemoval: (waiting: boolean) => void;
  hidden?: boolean;
}

export type RemovedMediaState = RemovedMediaEntry[] | 'loading';
