import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState
} from 'react';
import { IMediaLists } from '../types/entry';
import { IMediaContext } from './mediaProviderTypes';

const MediaContext = createContext<IMediaContext>({} as IMediaContext);

export const useMedia = () => useContext(MediaContext);

const MediaProvider: React.FC<
  PropsWithChildren<{ mediaLists: IMediaLists }>
> = ({ children, mediaLists }) => {
  const [current, setCurrent] = useState(mediaLists.current);
  const [waiting, setWaiting] = useState(mediaLists.waiting);

  const removeCurrentEntry = (mediaId: number) => {
    setCurrent(prev => (prev ?? []).filter(m => m.mediaId !== mediaId));
  };

  const removeWaitingEntry = (mediaId: number) => {
    setWaiting(prev => (prev ?? []).filter(m => m.mediaId !== mediaId));
  };

  return (
    <MediaContext.Provider
      value={{
        current,
        waiting,
        removeCurrentEntry,
        removeWaitingEntry
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export default MediaProvider;
