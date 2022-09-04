import { useApolloClient, useQuery } from '@apollo/client';
import { Anchor } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import {
  showNotification,
  cleanNotificationsQueue
} from '@mantine/notifications';
import axios from 'axios';
import { signInWithCustomToken, Unsubscribe } from 'firebase/auth';
import { useRouter } from 'next/router';
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import useSWR from 'swr';
import userQuery, { UserQueryData } from '../../../apollo/queries/userQuery';
import { getUserData } from '../../firebase/db';
import { auth } from '../../firebase/firebase';
import useNotification from '../useNotification';
import { IUserContext, IUserData } from './userProviderTypes';

const fetcher = async (url: string, uid: string) =>
  await axios.get<string>(url, { params: { uid } }).then(res => res.data);

const UserContext = createContext<IUserContext>({
  fullyAuthenticated: false,
  aniListUser: null,
  firebaseUser: null,
  userData: null,
  signOut: () => {}
});

export const useUser = () => useContext(UserContext);

const UserProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { showError } = useNotification();
  const apolloClient = useApolloClient();
  const { pathname } = useRouter();
  const [user, firebaseLoading, firebaseError] = useAuthState(auth);
  const [userData, setUserData] = useState<IUserData | null>();
  const [hasError, setHasError] = useState<unknown>();
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
    let unsubscribe: Unsubscribe | void;
    if (user) {
      try {
        unsubscribe = getUserData(user.uid, setUserData);
      } catch (error) {
        setHasError(error);
        showError(error);
      }
    } else {
      setUserData(undefined);
    }

    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (error || firebaseError || hasError)
      showError(error ?? firebaseError ?? hasError);
  }, [error, firebaseError, hasError]);

  const fullyAuthenticated =
    loading || firebaseLoading ? 'loading' : !!user && !!data?.Viewer;

  const signOut = async () => {
    setAccessToken('');
    await auth.signOut();
    await apolloClient.resetStore();
    cleanNotificationsQueue();
    showNotification({
      title: (
        <>
          Remember to revoke the access token from your{' '}
          <Anchor
            href="https://anilist.co/settings/apps"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            Apps page
          </Anchor>{' '}
          on AniList
        </>
      ),
      message: '',
      autoClose: 20000
    });
  };

  return (
    <UserContext.Provider
      value={{
        fullyAuthenticated,
        aniListUser: data?.Viewer ?? null,
        firebaseUser: user ?? null,
        userData,
        signOut
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
