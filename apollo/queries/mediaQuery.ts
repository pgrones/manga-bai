import { gql } from '@apollo/client';

const mediaQuery = gql`
  query ($userId: Int) {
    Page {
      pageInfo {
        hasNextPage
      }
      mediaList(
        userId: $userId
        status_in: [CURRENT, PAUSED]
        type: MANGA
        sort: STATUS
      ) {
        status
        mediaId
        progressVolumes
        progress
        customLists
        media {
          siteUrl
          bannerImage
          coverImage {
            large
          }
          title {
            userPreferred
          }
        }
      }
    }
  }
`;

export default mediaQuery;

export interface MediaQueryData {
  Page: Page;
}

export interface Page {
  pageInfo: PageInfo;
  mediaList: MediaList[];
}

export interface MediaList {
  status: Status;
  mediaId: number;
  progressVolumes: number;
  progress: number;
  customLists: CustomLists;
  media: Media;
}

export interface Media {
  siteUrl: string;
  coverImage: Image;
  bannerImage: string;
  title: Title;
}

export interface Image {
  large: string;
}

export interface Title {
  userPreferred: string;
}

export interface CustomLists {
  [key: string]: boolean;
}

export type Status = 'CURRENT' | 'PAUSED';

export interface PageInfo {
  hasNextPage: boolean;
}
