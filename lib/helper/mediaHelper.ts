import { IMediaData } from '../types/entry';
import { WAITING_CUSTOM_LIST } from './constants';

export const isCurrentMedia = (m: IMediaData) =>
  m.status === 'CURRENT' && !m.customLists?.[WAITING_CUSTOM_LIST];

export const isWaitingMedia = (m: IMediaData) =>
  m.customLists?.[WAITING_CUSTOM_LIST] ?? false;
