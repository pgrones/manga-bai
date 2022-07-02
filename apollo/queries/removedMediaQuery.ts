import { gql } from '@apollo/client';

const removedMediaQuery = gql`
  query getMediaByIds($ids: [Int], $page: Int) {
    Page(perPage: 50, page: $page) {
      pageInfo {
        hasNextPage
      }
      media(type: MANGA, id_in: $ids) {
        id
        format
        synonyms
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
  synonyms: string[];
  title: Title;
  coverImage: Image;
  format: Format;
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

export type Format = 'MANGA' | 'NOVEL' | 'ONE_SHOT';
