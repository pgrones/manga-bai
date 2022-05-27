import { useApolloClient, useQuery } from '@apollo/client';
import { useLocalStorage } from '@mantine/hooks';
import { Unsubscribe, User } from 'firebase/auth';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import userQuery, {
  User as AnilistUser,
  UserQueryData
} from '../../apollo/queries/userQuery';
import { getUserData } from '../firebase/db';
import { auth } from '../firebase/firebase';
import useNotification from './useNotification';

interface IUserContext {
  fullyAuthenticated: boolean | 'loading';
  aniListUser: AnilistUser | null;
  firebaseUser: User | null;
  userData: any;
  signOut: () => void;
}

const UserContext = createContext<IUserContext>({
  fullyAuthenticated: false,
  aniListUser: null,
  firebaseUser: null,
  userData: null,
  signOut: () => {}
});

export const useUser = () => useContext(UserContext);

const UserProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { showError } = useNotification();
  const [hasError, setHasError] = useState<unknown>();
  const apolloClient = useApolloClient();
  const [user, firebaseLoading, firebaseError] = useAuthState(auth);
  const [userData, setUserData] = useState<any>();
  const [accessToken, setAccessToken] = useLocalStorage<string>({
    key: 'access_token',
    defaultValue: undefined,
    getInitialValueInEffect: true
  });

  const { data, error, loading } = useQuery<UserQueryData>(userQuery, {
    skip: !accessToken
  });

  useEffect(() => {
    let unsubscribe: Unsubscribe | void;
    if (user) {
      try {
        unsubscribe = getUserData(user.uid, data => {
          setUserData(data?.accessToken);
        });
      } catch (error) {
        setHasError(error);
        console.log(error);
      }
    } else {
      setUserData(null);
    }

    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (error || hasError || firebaseError) showError();
  }, [error, hasError, firebaseError]);

  const fullyAuthenticated =
    loading || firebaseLoading ? 'loading' : !!user && !!data?.Viewer;

  return (
    <UserContext.Provider
      value={{
        fullyAuthenticated,
        aniListUser: data?.Viewer ?? null,
        firebaseUser: user ?? null,
        userData,
        signOut: () => {
          setAccessToken('');
          auth.signOut();
          apolloClient.resetStore();
        }
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
