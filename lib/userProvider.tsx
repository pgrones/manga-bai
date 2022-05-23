import { useQuery } from '@apollo/client';
import { useLocalStorage } from '@mantine/hooks';
import React, { createContext, PropsWithChildren, useContext } from 'react';
import viewerQuery, {
  Viewer,
  ViewerQueryData
} from '../apollo/queries/viewQuery';

const UserContext = createContext<Viewer | undefined>(undefined);

export const useUser = () => {
  const [, setUserToken] = useLocalStorage<string>({
    key: 'user-token',
    defaultValue: undefined,
    getInitialValueInEffect: true
  });

  return [useContext(UserContext), () => setUserToken('')] as [
    Viewer | undefined,
    () => void
  ];
};

const UserProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [userToken] = useLocalStorage<string>({
    key: 'user-token',
    defaultValue: undefined,
    getInitialValueInEffect: true
  });

  const { data } = useQuery<ViewerQueryData>(viewerQuery, { skip: !userToken });

  return (
    <UserContext.Provider value={!userToken ? undefined : data?.Viewer}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
