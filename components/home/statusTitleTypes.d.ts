import { Dispatch, RefObject, SetStateAction } from 'react';

export interface StatusTitleProps {
  setTitle: Dispatch<SetStateAction<string>>;
  toolbarRef: RefObject<HTMLDivElement>;
}
