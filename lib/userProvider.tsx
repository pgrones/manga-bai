import { useQuery } from '@apollo/client';
import { useLocalStorage } from '@mantine/hooks';
import React, { createContext, PropsWithChildren, useContext } from 'react';
import userQuery, { User, UserQueryData } from '../apollo/queries/userQuery';

const UserContext = createContext<User | undefined>(undefined);

export const useUser = () => {
  const [, setUserToken] = useLocalStorage<string>({
    key: 'access_token',
    defaultValue: undefined,
    getInitialValueInEffect: true
  });

  return [useContext(UserContext), () => setUserToken('')] as [
    User | undefined,
    () => void
  ];
};

const UserProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [userToken] = useLocalStorage<string>({
    key: 'access_token',
    defaultValue: undefined,
    getInitialValueInEffect: true
  });

  const { data } = useQuery<UserQueryData>(userQuery, { skip: !userToken });

  return (
    <UserContext.Provider value={!userToken ? undefined : data?.Viewer}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
