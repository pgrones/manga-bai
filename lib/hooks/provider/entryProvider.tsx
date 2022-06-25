import React, { createContext, PropsWithChildren, useContext } from 'react';
import { IMediaData } from '../../types/entry';
import useAniListData from '../useAniListData';
import useFirebaseData from '../useFirebaseData';
import { IEntryContext } from './entryProviderTypes';

const EntryContext = createContext<IEntryContext>({} as IEntryContext);

export const useEntry = () => useContext(EntryContext);

const EntryProvider: React.FC<PropsWithChildren<{ entry: IMediaData }>> = ({
  children,
  entry
}) => {
  const { aniListData, updateAniListData, updateProgress, removeFromList } =
    useAniListData(entry);
  const { firebaseData, updateFirebaseData, updatePreordered } =
    useFirebaseData(entry);

  return (
    <EntryContext.Provider
      value={{
        aniListData,
        updateAniListData,
        updateProgress,
        firebaseData,
        updateFirebaseData,
        updatePreordered,
        removeFromList
      }}
    >
      {children}
    </EntryContext.Provider>
  );
};

export default EntryProvider;
