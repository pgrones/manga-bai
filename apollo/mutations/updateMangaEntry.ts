import { gql } from '@apollo/client';
import { CustomLists, Status } from '../queries/mediaQuery';

const updateMangaEntry = gql`
  mutation updateMangaEntry(
    $mediaId: Int!
    $customLists: [String]
    $status: MediaListStatus
    $progressVolumes: Int
    $progress: Int
  ) {
    SaveMediaListEntry(
      mediaId: $mediaId
      customLists: $customLists
      status: $status
      progressVolumes: $progressVolumes
      progress: $progress
    ) {
      mediaId
      customLists
      status
      progressVolumes
      progress
    }
  }
`;

export default updateMangaEntry;

export interface UpdateMangaEntryVariables {
  mediaId: number;
  customLists?: string[];
  status?: Status;
  progressVolumes?: number;
  progress?: number;
}

export interface UpdateMangaEntryData {
  SaveMediaListEntry: SaveMediaListEntry;
}

export interface SaveMediaListEntry {
  mediaId: number;
  customLists: CustomLists;
  status: Status;
  progressVolumes: number;
  progress: number;
}
