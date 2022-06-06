import { IMediaData } from '../types/entry';

export interface IMediaContext {
  current?: IMediaData[];
  waiting?: IMediaData[];
  removeCurrentEntry: (mediaId: number) => void;
  removeWaitingEntry: (mediaId: number) => void;
}
