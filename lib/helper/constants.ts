import { Format, Title } from '../../apollo/queries/mediaListQuery';

export const WAITING = 'Waiting For New Volumes';
export const WAITING_CUSTOM_LIST = 'Waiting For New Volumes - Manga Bai';
export const CURRENT = 'Currently Reading';
export const titles: (keyof Title)[] = ['romaji', 'english', 'native'];
export const formatMap: { [key in Format]: string } = {
  ONE_SHOT: 'One Shot',
  MANGA: 'Manga',
  NOVEL: 'Light Novel'
};
