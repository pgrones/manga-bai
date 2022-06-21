import { gql } from '@apollo/client';

const mediaQuery = gql`
  query getMedia($userId: Int!, $mediaId: Int!) {
    MediaList(userId: $userId, type: MANGA, mediaId: $mediaId) {
      customLists
    }
  }
`;

export default mediaQuery;

export interface MediaQueryVariables {
  userId: number;
  mediaId: number;
}

export interface MediaQueryData {
  MediaList: MediaList;
}

export interface MediaList {
  customLists: CustomLists | null;
}

export interface CustomLists {
  [key: string]: boolean;
}
