import { MediaListQueryData } from '../../../apollo/queries/mediaListQuery';
import { IMediaLists } from '../../types/entry';

export interface IOnboardingContext {
  step: number;
  nextStep: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  mediaData: MediaListQueryData | undefined;
  setMediaLists: React.Dispatch<React.SetStateAction<IMediaLists | undefined>>;
  customLists: string[] | undefined;
  done: () => void;
}
