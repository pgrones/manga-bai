import { MediaList } from '../../../apollo/queries/mediaListQuery';
import { IAniListValues } from '../../types/aniList';
import { IFirebaseValues } from '../../types/firebase';

export interface IEntryContext {
  aniListData: MediaList;
  updateAniListData: (values: IAniListValues) => Promise<void>;
  firebaseData?: IFirebaseValues;
  updateFirebaseData: (
    values: IFirebaseValues,
    checkForNewVolumes?: boolean
  ) => Promise<void>;
  removeFromList: () => Promise<void>;
}
