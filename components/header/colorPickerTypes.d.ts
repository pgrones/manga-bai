import { Dispatch, SetStateAction } from 'react';

export interface ColorPickerProps {
  setCloseOnClickOutside: Dispatch<SetStateAction<boolean>>;
}
