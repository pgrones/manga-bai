import { MediaList } from '../../apollo/queries/mediaListQuery';
import { IFirebaseValues } from './firebase';

export interface IMediaData extends MediaList, IFirebaseValues {
  hidden?: boolean;
  hasNewVolume?: boolean;
}

export interface IMediaLists {
  paused?: MediaList[];
  current?: IMediaData[];
  waiting?: IMediaData[];
  hasCustomList: boolean;
}
