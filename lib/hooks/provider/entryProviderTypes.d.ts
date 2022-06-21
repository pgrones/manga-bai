import { MediaList } from '../../../apollo/queries/mediaListQuery';
import { IAniListValues } from '../../types/aniList';
import { IFirebaseValues } from '../../types/firebase';

export interface IEntryContext {
  aniListData: MediaList;
  updateAniListData: (values: IAniListValues) => Promise<void>;
  updateProgress: (progress: number, key: keyof MediaList) => void;
  firebaseData?: IFirebaseValues;
  updateFirebaseData: (values: IFirebaseValues) => Promise<void>;
  updatePreordered: (preordered: number) => void;
  removeFromList: () => Promise<void>;
}
