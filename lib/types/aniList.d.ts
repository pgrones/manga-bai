import { Status } from '../../apollo/queries/mediaListQuery';

export interface IAniListValues {
  status?: Status;
  progressVolumes?: number;
  progress?: number;
}
