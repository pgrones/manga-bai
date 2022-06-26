import { useLazyQuery, useMutation } from '@apollo/client';
import updateMangaEntry, {
  UpdateMangaEntryVariables
} from '../../apollo/mutations/updateMangaEntry';
import mediaQuery, {
  MediaQueryData,
  MediaQueryVariables
} from '../../apollo/queries/mediaQuery';
import removedMediaQuery, {
  RemovedMediaQueryData,
  RemovedMediaQueryVariables
} from '../../apollo/queries/removedMediaQuery';

const useRemovedMedia = () => {
  const [getRemovedMedia, { error, fetchMore }] = useLazyQuery<
    RemovedMediaQueryData,
    RemovedMediaQueryVariables
  >(removedMediaQuery);

  const [getMedia, { error: mediaError }] = useLazyQuery<
    MediaQueryData,
    MediaQueryVariables
  >(mediaQuery);

  // Update an entry in the custom list "Waiting For New Volumes" on AniList
  const [updateEntry, { error: fillError }] = useMutation<
    unknown,
    UpdateMangaEntryVariables
  >(updateMangaEntry, { ignoreResults: true });

  return {
    getRemovedMedia,
    fetchMore,
    getMedia,
    updateEntry,
    error: error || mediaError || fillError
  };
};

export default useRemovedMedia;
