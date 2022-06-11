import { CURRENT, WAITING } from '../helper/constants';
import { IMediaData } from '../types/entry';
import { Layout } from '../types/user';

export interface IMediaContext {
  current?: IMediaData[];
  waiting?: IMediaData[];
  removeCurrentEntry: (mediaId: number) => void;
  removeWaitingEntry: (mediaId: number) => void;
  search: (value: string) => void;
  status: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
  layout: Layout;
}

export type Status = typeof CURRENT | typeof WAITING | null;
