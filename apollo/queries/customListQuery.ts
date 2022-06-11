import { gql } from '@apollo/client';

const customListQuery = gql`
  query getCustomLists($id: Int!) {
    User(id: $id) {
      mediaListOptions {
        mangaList {
          customLists
        }
      }
    }
  }
`;

export default customListQuery;

export interface CustomListQueryVariables {
  id: number;
}

export interface CustomListQueryData {
  User: User;
}

export interface User {
  mediaListOptions: MediaListOptions;
}

export interface MediaListOptions {
  mangaList: MangaList;
}

export interface MangaList {
  customLists: string[];
}
