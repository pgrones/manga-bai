import { MediaList } from '../../apollo/queries/mediaQuery';
import { IFirebaseValues } from './firebase';

export type IMediaData = MediaList & IFirebaseValues;

export interface IMediaLists {
  paused?: MediaList[];
  current?: IMediaData[];
  waiting?: IMediaData[];
  hasCustomList: boolean;
}
