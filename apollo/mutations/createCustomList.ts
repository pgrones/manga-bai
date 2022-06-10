import { gql } from '@apollo/client';

const createCustomList = gql`
  mutation createCustomList($customLists: [String]!) {
    UpdateUser(mangaListOptions: { customLists: $customLists }) {
      id
    }
  }
`;

export default createCustomList;

export interface CreateCustomListVariables {
  customLists: string[];
}
