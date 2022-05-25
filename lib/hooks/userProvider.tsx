import { useQuery } from '@apollo/client';
import { useLocalStorage } from '@mantine/hooks';
import axios from 'axios';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react';
import userQuery, { User, UserQueryData } from '../../apollo/queries/userQuery';

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
  const [user, setUser] = useState();
  const [userToken] = useLocalStorage<string>({
    key: 'access_token',
    defaultValue: undefined,
    getInitialValueInEffect: true
  });

  const { data } = useQuery<UserQueryData>(userQuery, { skip: !userToken });

  useEffect(() => {
    if (data) {
      axios.get(`/api/user/${data.Viewer.id}`);
    }
  }, [data]);

  return (
    <UserContext.Provider value={!userToken ? undefined : data?.Viewer}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
