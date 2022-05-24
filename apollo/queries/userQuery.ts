import { gql } from '@apollo/client';

const userQuery = gql`
  query {
    Viewer {
      id
      name
      avatar {
        large
      }
    }
  }
`;

export default userQuery;

export interface UserQueryData {
  Viewer: User;
}

export interface User {
  id: number;
  name: string;
  avatar: Avatar;
}

export interface Avatar {
  large: string;
}
