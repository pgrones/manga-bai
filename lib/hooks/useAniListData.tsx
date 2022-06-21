import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import updateMangaEntry, {
  UpdateMangaEntryData,
  UpdateMangaEntryVariables
} from '../../apollo/mutations/updateMangaEntry';
import { MediaList } from '../../apollo/queries/mediaListQuery';
import { WAITING_CUSTOM_LIST } from '../helper/constants';
import { IAniListValues } from '../types/aniList';
import useNotification from './useNotification';

export const useAniListData = (entry: MediaList) => {
  const [aniListData, setAniListData] = useState<MediaList>(entry);
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

    const { data } = await updateEntry({
      variables: { ...values, mediaId: entry.mediaId }
    });

    if (!data) return;

    setAniListData(prev => ({ ...prev, ...data.SaveMediaListEntry }));
  };

  const updateProgress = async (progress: number, key: keyof MediaList) => {
    if (progress === aniListData[key]) return;
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
                Object.entries(aniListData.customLists ?? []).filter(
                  o => o[1] === true && o[0] !== WAITING_CUSTOM_LIST
                )
              )
            )
          )
        ),
        mediaId: aniListData.mediaId
      }
    });
  };

  return { aniListData, updateAniListData, updateProgress, removeFromList };
};

export default useAniListData;
