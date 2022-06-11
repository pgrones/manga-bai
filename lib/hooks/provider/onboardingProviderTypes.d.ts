import { MediaQueryData } from '../../../apollo/queries/mediaQuery';
import { IMediaLists } from '../../types/entry';

export interface IOnboardingContext {
  step: number;
  nextStep: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  mediaData: MediaQueryData | undefined;
  setMediaLists: React.Dispatch<React.SetStateAction<IMediaLists | undefined>>;
  customLists: string[] | undefined;
  done: () => void;
}
