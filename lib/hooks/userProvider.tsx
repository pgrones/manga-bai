import { useApolloClient, useQuery } from '@apollo/client';
import { useLocalStorage } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import axios from 'axios';
import { signInWithCustomToken } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect
} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import useSWR from 'swr';
import userQuery, { UserQueryData } from '../../apollo/queries/userQuery';
import { auth } from '../firebase/firebase';
import useNotification from './useNotification';
import { IUserContext } from './userProviderTypes';

const fetcher = async (url: string, uid: string) =>
  await axios.get<string>(url, { params: { uid } }).then(res => res.data);

const UserContext = createContext<IUserContext>({
  fullyAuthenticated: false,
  aniListUser: null,
  firebaseUser: null,
  signOut: () => {}
});

export const useUser = () => useContext(UserContext);

const UserProvider: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { showError } = useNotification();
  const { cleanQueue, showNotification } = useNotifications();
  const apolloClient = useApolloClient();
  const { pathname } = useRouter();
  const [user, firebaseLoading, firebaseError] = useAuthState(auth);
  const [accessToken, setAccessToken] = useLocalStorage<string>({
    key: 'access_token',
    defaultValue: undefined,
    getInitialValueInEffect: true
  });

  const { data, error, loading } = useQuery<UserQueryData>(userQuery, {
    skip: !accessToken
  });

  const { data: authData } = useSWR(
    data?.Viewer && !user && pathname.includes('signin')
      ? ['/api/auth', data.Viewer.id]
      : null,
    fetcher
  );

  useEffect(() => {
    if (authData) {
      signInWithCustomToken(auth, authData);
    }
  }, [authData]);

  useEffect(() => {
    if (error || firebaseError) showError();
  }, [error, firebaseError]);

  const fullyAuthenticated =
    loading || firebaseLoading ? 'loading' : !!user && !!data?.Viewer;

  return (
    <UserContext.Provider
      value={{
        fullyAuthenticated,
        aniListUser: data?.Viewer ?? null,
        firebaseUser: user ?? null,
        signOut: async () => {
          setAccessToken('');
          await auth.signOut();
          await apolloClient.resetStore();
          cleanQueue();
          showNotification({
            title:
              'Remember to revoke the access token from your Apps page on AniList',
            message: '',
            autoClose: 10000
          });
        }
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
