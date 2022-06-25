import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import updateMangaEntry, {
  UpdateMangaEntryData,
  UpdateMangaEntryVariables
} from '../../apollo/mutations/updateMangaEntry';
import { MediaList } from '../../apollo/queries/mediaListQuery';
import { WAITING_CUSTOM_LIST } from '../helper/constants';
import { IAniListValues } from '../types/aniList';
import { useMedia } from './provider/mediaProvider';
import useNotification from './useNotification';

export const useAniListData = (entry: MediaList) => {
  const { updateEntry: updateLocalEntry } = useMedia();
  const { showSuccess, showError } = useNotification();

  const [updateEntry, { error }] = useMutation<
    UpdateMangaEntryData,
    UpdateMangaEntryVariables
  >(updateMangaEntry);

  useEffect(() => {
    if (error) showError();
  }, [error]);

  const updateAniListData = async (values: IAniListValues) => {
    Object.keys(values).forEach(key => {
      if (values[key as keyof typeof values] === undefined)
        delete values[key as keyof typeof values];
    });

    if (!Object.keys(values).length) return;

    const customLists = new Set(
      Object.keys(
        Object.fromEntries(
          Object.entries(entry.customLists ?? []).filter(o => o[1] === true)
        )
      )
    );

    if (values.status === 'PAUSED') customLists.add(WAITING_CUSTOM_LIST);
    if (values.status === 'CURRENT') customLists.delete(WAITING_CUSTOM_LIST);

    const { data } = await updateEntry({
      variables: {
        ...values,
        mediaId: entry.mediaId,
        customLists: Array.from(customLists)
      }
    });

    if (!data) return;

    updateLocalEntry(data.SaveMediaListEntry.mediaId, data.SaveMediaListEntry);
  };

  const updateProgress = async (progress: number, key: keyof MediaList) => {
    if (progress === entry[key]) return;
    await updateAniListData({ [key]: progress });
    showSuccess(`${entry.media.title.userPreferred} entry updated`);
  };

  const removeFromList = async () => {
    await updateEntry({
      variables: {
        customLists: Array.from(
          new Set(
            Object.keys(
              Object.fromEntries(
                Object.entries(entry.customLists ?? []).filter(
                  o => o[1] === true && o[0] !== WAITING_CUSTOM_LIST
                )
              )
            )
          )
        ),
        mediaId: entry.mediaId
      }
    });
  };

  return {
    aniListData: entry,
    updateAniListData,
    updateProgress,
    removeFromList
  };
};

export default useAniListData;
