import { gql } from '@apollo/client';

const fillCustomListMutation = gql`
  mutation ($mediaId: Int, $customLists: [String]) {
    SaveMediaListEntry(mediaId: $mediaId, customLists: $customLists) {
      id
    }
  }
`;

export default fillCustomListMutation;
