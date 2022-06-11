import { useLocalStorage } from '@mantine/hooks';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useRef,
  useState
} from 'react';
import { Title } from '../../../apollo/queries/mediaQuery';
import { CURRENT, WAITING } from '../../helper/constants';
import { IMediaData, IMediaLists } from '../../types/entry';
import { Layout } from '../../types/user';
import { IMediaContext, Status } from './mediaProviderTypes';

const titles: (keyof Title)[] = ['romaji', 'english', 'native'];

const MediaContext = createContext<IMediaContext>({} as IMediaContext);

export const useMedia = () => useContext(MediaContext);

const MediaProvider: React.FC<
  PropsWithChildren<{ mediaLists: IMediaLists }>
> = ({ children, mediaLists }) => {
  const [current, setCurrent] = useState(mediaLists.current);
  const [waiting, setWaiting] = useState(mediaLists.waiting);
  const [status, setStatus] = useState<Status>(null);
  const fullData =
    useRef<[IMediaData[] | undefined, IMediaData[] | undefined]>();

  const [layout] = useLocalStorage<Layout>({
    key: 'media-layout',
    defaultValue: 'grid',
    getInitialValueInEffect: true
  });

  const removeCurrentEntry = (mediaId: number) => {
    setCurrent(prev => (prev ?? []).filter(m => m.mediaId !== mediaId));
  };

  const removeWaitingEntry = (mediaId: number) => {
    setWaiting(prev => (prev ?? []).filter(m => m.mediaId !== mediaId));
  };

  const search = (value: string) => {
    value = value.trim().toLowerCase();
    if (!value && !fullData.current) return;

    if (!value && fullData.current) {
      setCurrent(fullData.current[0]);
      setWaiting(fullData.current[1]);
      fullData.current = undefined;
      return;
    }

    if (!fullData.current) fullData.current = [current, waiting];

    setCurrent(
      fullData.current[0]?.filter(c =>
        titles.some(t => c.media.title[t]?.toLowerCase().includes(value))
      )
    );

    setWaiting(
      fullData.current[1]?.filter(w =>
        titles.some(t => w.media.title[t]?.toLowerCase().includes(value))
      )
    );
  };

  return (
    <MediaContext.Provider
      value={{
        current: status !== WAITING ? current : undefined,
        waiting: status !== CURRENT ? waiting : undefined,
        removeCurrentEntry,
        removeWaitingEntry,
        search,
        status,
        setStatus,
        layout
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export default MediaProvider;
