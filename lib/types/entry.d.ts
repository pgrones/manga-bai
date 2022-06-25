import { MediaList } from '../../apollo/queries/mediaListQuery';
import { IFirebaseValues } from './firebase';

export type IMediaData = MediaList & IFirebaseValues & { hidden?: boolean };

export interface IMediaLists {
  paused?: MediaList[];
  current?: IMediaData[];
  waiting?: IMediaData[];
  hasCustomList: boolean;
}
