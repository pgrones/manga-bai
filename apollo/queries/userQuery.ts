import { gql } from '@apollo/client';

const userQuery = gql`
  query getUser {
    Viewer {
      id
      name
      avatar {
        medium
      }
    }
  }
`;

export default userQuery;

export interface UserQueryData {
  Viewer: AniListUser;
}

export interface AniListUser {
  id: number;
  name: string;
  avatar: Avatar;
}

export interface Avatar {
  medium: string;
}
