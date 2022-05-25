import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { AppProps } from 'next/app';
import { getCookie, setCookies } from 'cookies-next';
import Head from 'next/head';
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useApollo } from '../apollo/client';
import UserProvider from '../lib/hooks/userProvider';
import { ApolloProvider } from '@apollo/client';
import { SpotlightProvider } from '@mantine/spotlight';
import '../styles/globalStyles.css';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const apolloClient = useApollo(pageProps?.initialApolloState);
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30
    });
  };

  return (
    <>
      <Head>
        <title>Manga Bai</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ApolloProvider client={apolloClient}>
        <UserProvider>
          <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
          >
            <MantineProvider
              theme={{ primaryColor: 'indigo', colorScheme }}
              withGlobalStyles
              withNormalizeCSS
            >
              <SpotlightProvider actions={[]}>
                <NotificationsProvider>
                  <Component {...pageProps} />
                </NotificationsProvider>
              </SpotlightProvider>
            </MantineProvider>
          </ColorSchemeProvider>
        </UserProvider>
      </ApolloProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light'
});
