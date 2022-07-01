import { Dispatch, SetStateAction } from 'react';
import { MediaListQueryData } from '../../../apollo/queries/mediaListQuery';

export interface IOnboardingContext {
  step: number;
  nextStep: () => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  mediaData: MediaListQueryData | undefined;
  customLists: string[] | undefined;
  done: () => void;
}

export interface OnboardingProps {
  mediaData: MediaListQueryData | undefined;
  customLists: string[] | undefined;
}
