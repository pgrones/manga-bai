import { CURRENT, WAITING } from '../../helper/constants';
import { IMediaData } from '../../types/entry';
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

export type Status = typeof CURRENT | typeof WAITING | null;
