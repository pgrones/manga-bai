import { gql } from '@apollo/client';

const customListMutation = gql`
  mutation ($customLists: [String]) {
    UpdateUser(mangaListOptions: { customLists: $customLists }) {
      id
    }
  }
`;

export default customListMutation;
