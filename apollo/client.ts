import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { RetryLink } from '@apollo/client/link/retry';
import { useMemo } from 'react';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const httpLink = createHttpLink({
  uri: 'https://graphql.anilist.co'
});

const retryLink = new RetryLink({
  attempts: (count, _, error) => count < 5 && !!error,
  delay: (count, operation) => {
    const { response } = operation.getContext();

    let delay = Math.random() * (1000 * 2 ** count);
    const reset = response?.headers?.get('x-ratelimit-reset');
    if (reset) {
      delay += Math.max(reset * 1000 - Date.now(), 0);
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
    link: from([retryLink, authLink.concat(httpLink)]),
    cache: new InMemoryCache()
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
