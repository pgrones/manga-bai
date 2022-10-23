import { CURRENT, NEW_VOLUMES, WAITING } from '../../helper/constants';
import { IAniListValues } from '../../types/aniList';
import { IMediaData } from '../../types/entry';
import { IFirebaseValues } from '../../types/firebase';
import { Layout } from '../../types/user';

export interface IMediaContext {
  media?: IMediaData[];
  removeEntry: (mediaId: number) => void;
  updateEntry: (
    mediaId: number,
    values: IAniListValues | IFirebaseValues
  ) => void;
  search: (value: string) => void;
  status: Status;
  changeStatus: (newStatus: Status) => void;
  layout: Layout;
}

export type Status =
  | typeof CURRENT
  | typeof WAITING
  | typeof NEW_VOLUMES
  | null;
