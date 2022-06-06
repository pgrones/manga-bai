import { Media } from '../../apollo/queries/mediaQuery';

export interface HeaderProps extends Media {
  close: () => void;
}
