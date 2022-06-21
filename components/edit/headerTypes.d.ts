import { Media } from '../../apollo/queries/mediaListQuery';

export interface HeaderProps extends Media {
  close: () => void;
}
