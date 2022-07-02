import { gql } from '@apollo/client';

const mediaListQuery = gql`
  query getMediaCollection($userId: Int!) {
    MediaListCollection(
      userId: $userId
      status_in: [CURRENT, PAUSED]
      type: MANGA
      sort: SCORE_DESC
    ) {
      lists {
        entries {
          ...mediaListEntry
        }
      }
    }
  }

  fragment mediaListEntry on MediaList {
    status
    mediaId
    progressVolumes
    progress
    customLists
    media {
      siteUrl
      format
      bannerImage
      coverImage {
        large
        extraLarge
      }
      synonyms
      title {
        userPreferred
        romaji
        english
        native
      }
    }
  }
`;

export default mediaListQuery;

export interface MediaListQueryVariables {
  userId: number;
}

export interface MediaListQueryData {
  MediaListCollection: MediaListCollection;
}

export interface MediaListCollection {
  lists: { entries?: MediaList[] }[];
}

export interface MediaList {
  status: Status;
  mediaId: number;
  progressVolumes: number;
  progress: number;
  customLists: CustomLists | null;
  media: Media;
}

export interface Media {
  siteUrl: string;
  format: Format;
  coverImage: Image;
  bannerImage: string;
  synonyms: string[];
  title: Title;
}

export interface Image {
  large: string;
  extraLarge: string;
}

export interface Title {
  userPreferred: string;
  romaji: string;
  english: string;
  native: string;
}

export interface CustomLists {
  [key: string]: boolean;
}

export type Status = 'CURRENT' | 'PAUSED';
export type Format = 'MANGA' | 'NOVEL' | 'ONE_SHOT';
