import { gql } from '@apollo/client';

const updateCustomLists = gql`
  mutation updateCustomList($customLists: [String]!) {
    UpdateUser(mangaListOptions: { customLists: $customLists }) {
      id
    }
  }
`;

export default updateCustomLists;

export interface UpdateCustomListsVariables {
  customLists: string[];
}
