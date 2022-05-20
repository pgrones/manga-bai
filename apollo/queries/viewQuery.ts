import { gql } from '@apollo/client';

const viewerQuery = gql`
  query {
    Viewer {
      id
      name
      siteUrl
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
  siteUrl: string;
  avatar: Avatar;
}

export interface Avatar {
  large: string;
}
