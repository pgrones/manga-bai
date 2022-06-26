import { Dispatch, SetStateAction } from 'react';
import { MediaListQueryData } from '../../../apollo/queries/mediaListQuery';
import { IMediaLists } from '../../types/entry';

export interface IOnboardingContext {
  step: number;
  nextStep: () => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  mediaData: MediaListQueryData | undefined;
  setMediaLists: Dispatch<SetStateAction<IMediaLists | undefined>>;
  customLists: string[] | undefined;
  done: () => void;
}

export interface OnboardingProps {
  setMediaLists: Dispatch<SetStateAction<IMediaLists | undefined>>;
  mediaData: MediaListQueryData | undefined;
  customLists: string[] | undefined;
}
