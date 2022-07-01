import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { GraphQLError } from 'graphql';
import { useMemo } from 'react';
import { auth } from '../lib/firebase/firebase';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const httpLink = createHttpLink({
  uri: 'https://graphql.anilist.co'
});

// Log User out on invalid or expired token
const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors && typeof window !== 'undefined') {
    const invalidToken =
      graphQLErrors.find(e => e.message === 'Invalid token') ||
      graphQLErrors.find(
        e => (e as GraphQLError & { status: number }).status === 401
      );

    if (invalidToken) {
      localStorage.setItem('access_token', '');
      auth.signOut();
      window.location.href = '/?reason=InvalidToken';
    }
  }
});

// Retry after errors
// Delay waits for x-ratelimit-reset
const retryLink = new RetryLink({
  attempts: (count, _, error) =>
    !!error &&
    error.response?.status !== 401 &&
    !error.result?.errors?.find((e: any) => e.message === 'Invalid token') &&
    count < 5,
  delay: (count, operation) => {
    const { response } = operation.getContext();

    let delay = Math.random() * (3000 * 2 ** count);
    const reset = response?.headers?.get('x-ratelimit-reset');
    if (reset) {
      delay += Math.max(reset * 1000 - Date.now() + Math.random() * 5000, 0);
    }

    return delay;
  }
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =
    typeof window !== 'undefined' && localStorage.getItem('access_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
});

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, retryLink, authLink.concat(httpLink)]),
    cache: new InMemoryCache({
      typePolicies: {
        Page: { keyFields: [] }
      }
    })
  });
};

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const useApollo = (initialState: any) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};
