import React, { createContext, PropsWithChildren, useContext } from 'react';
import { IMediaData } from '../types/entry';
import { IEntryContext } from './entryProviderTypes';
import useAniListUpdate from './useAniListUpdate';
import useFirebaseUpdate from './useFirebaseUpdate';

const EntryContext = createContext<IEntryContext>({} as IEntryContext);

export const useEntry = () => useContext(EntryContext);

const EntryProvider: React.FC<PropsWithChildren<{ entry: IMediaData }>> = ({
  children,
  entry
}) => {
  const { aniListData, updateAniListData, updateProgress } =
    useAniListUpdate(entry);
  const { firebaseData, updateFirebaseData, updatePreordered } =
    useFirebaseUpdate(entry);

  return (
    <EntryContext.Provider
      value={{
        aniListData,
        updateAniListData,
        updateProgress,
        firebaseData,
        updateFirebaseData,
        updatePreordered
      }}
    >
      {children}
    </EntryContext.Provider>
  );
};

export default EntryProvider;
