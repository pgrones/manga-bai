import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { IMediaData } from '../../types/entry';
import useAniListData from '../useAniListData';
import useFirebaseData from '../useFirebaseData';
import { IEntryContext } from './entryProviderTypes';

const EntryContext = createContext<IEntryContext>({} as IEntryContext);

export const useEntry = () => useContext(EntryContext);

const EntryProvider: FC<PropsWithChildren<{ entry: IMediaData }>> = props => {
  const { children, entry } = props;
  const { aniListData, updateAniListData, removeFromList } =
    useAniListData(entry);
  const { firebaseData, updateFirebaseData } = useFirebaseData(entry);

  return (
    <EntryContext.Provider
      value={{
        aniListData,
        updateAniListData,
        firebaseData,
        updateFirebaseData,
        removeFromList
      }}
    >
      {children}
    </EntryContext.Provider>
  );
};

export default EntryProvider;
