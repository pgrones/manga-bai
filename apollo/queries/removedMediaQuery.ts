import { gql } from '@apollo/client';

const removedMediaQuery = gql`
  query getMediaByIds($ids: [Int], $page: Int) {
    Page(perPage: 50, page: $page) {
      pageInfo {
        hasNextPage
      }
      media(type: MANGA, id_in: $ids) {
        id
        title {
          userPreferred
          romaji
          english
          native
        }
        coverImage {
          large
        }
      }
    }
  }
`;

export default removedMediaQuery;

export interface RemovedMediaQueryVariables {
  ids: number[];
  page: number;
}

export interface RemovedMediaQueryData {
  Page: Page;
}

export interface Page {
  pageInfo: PageInfo;
  media: Media[];
}

export interface PageInfo {
  hasNextPage: boolean;
}

export interface Media {
  id: number;
  title: Title;
  coverImage: Image;
}

export interface Image {
  large: string;
}

export interface Title {
  userPreferred: string;
  romaji: string;
  english: string;
  native: string;
}
