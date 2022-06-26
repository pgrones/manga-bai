import { useLocalStorage } from '@mantine/hooks';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState
} from 'react';
import { titles } from '../../helper/constants';
import { IAniListValues } from '../../types/aniList';
import { IMediaLists } from '../../types/entry';
import { IFirebaseValues } from '../../types/firebase';
import { Layout } from '../../types/user';
import { IMediaContext, Status } from './mediaProviderTypes';

const MediaContext = createContext<IMediaContext>({} as IMediaContext);

export const useMedia = () => useContext(MediaContext);

const MediaProvider: FC<PropsWithChildren<{ mediaLists: IMediaLists }>> = ({
  children,
  mediaLists
}) => {
  const [media, setMedia] = useState([
    ...(mediaLists.current ?? []),
    ...(mediaLists.waiting ?? [])
  ]);
  const [status, setStatus] = useState<Status>(null);

  const [layout] = useLocalStorage<Layout>({
    key: 'media-layout',
    defaultValue: 'grid',
    getInitialValueInEffect: true
  });

  const removeEntry = (mediaId: number) => {
    setMedia(prev => (prev ?? []).filter(m => m.mediaId !== mediaId));
  };

  const updateEntry = (
    mediaId: number,
    values: IAniListValues | IFirebaseValues
  ) => {
    setMedia(prev => {
      const copy = prev?.slice();
      const item = copy?.findIndex(c => c.mediaId === mediaId);
      if (copy && (item ?? -1) > -1)
        copy[item!] = { ...copy[item!], ...values };
      return copy ?? [];
    });
  };

  const changeStatus = (newStatus: Status | null) => {
    setStatus(newStatus);
  };

  const search = (value: string) => {
    value = value.trim().toLowerCase();
    if (!value && !media.some(m => m.hidden)) return;

    if (!value && media.some(m => m.hidden)) {
      setMedia(prev => prev.map(m => ({ ...m, hidden: undefined })));
      return;
    }

    setMedia(prev =>
      prev.map(m => ({
        ...m,
        hidden: !titles.some(t =>
          m.media.title[t]?.toLowerCase().includes(value)
        )
      }))
    );
  };

  return (
    <MediaContext.Provider
      value={{
        media,
        removeEntry,
        updateEntry,
        search,
        status,
        changeStatus,
        layout
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export default MediaProvider;
