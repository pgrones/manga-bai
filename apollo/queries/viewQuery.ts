import { gql } from '@apollo/client';

const viewerQuery = gql`
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

export default viewerQuery;

export interface ViewerQueryData {
  Viewer: Viewer;
}

export interface Viewer {
  id: number;
  name: string;
  avatar: Avatar;
}

export interface Avatar {
  large: string;
}
