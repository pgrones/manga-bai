import { gql } from '@apollo/client';

const listQuery = gql`
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
        media {
          siteUrl
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

export default listQuery;

export interface ListQueryData {
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
  media: Media;
}

export interface Media {
  siteUrl: string;
  coverImage: CoverImage;
  title: Title;
}

export interface CoverImage {
  large: string;
}

export interface Title {
  userPreferred: string;
}

export type Status = 'CURRENT' | 'PAUSED';

export interface PageInfo {
  hasNextPage: boolean;
}
