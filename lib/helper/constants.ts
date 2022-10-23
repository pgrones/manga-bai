import { Format, Title } from '../../apollo/queries/mediaListQuery';

export const WAITING = 'Waiting For New Volumes';
export const WAITING_CUSTOM_LIST = 'Waiting For New Volumes - Manga Bai';
export const CURRENT = 'Currently Reading';
export const NEW_VOLUMES = 'New Volume Available';
export const LAST_CHANGE = '2022-10-23';
export const titles: (keyof Title)[] = ['romaji', 'english', 'native'];
export const formatMap: { [key in Format]: string } = {
  ONE_SHOT: 'One Shot',
  MANGA: 'Manga',
  NOVEL: 'Light Novel'
};
