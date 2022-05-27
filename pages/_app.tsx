import { ApolloProvider } from '@apollo/client';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { SpotlightProvider } from '@mantine/spotlight';
import { getCookie, setCookies } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import { useApollo } from '../apollo/client';
import UserProvider from '../lib/hooks/userProvider';
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
    document.documentElement.style.colorScheme = nextColorScheme;
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
              <ApolloProvider client={apolloClient}>
                <UserProvider>
                  <Component {...pageProps} />
                </UserProvider>
              </ApolloProvider>
            </NotificationsProvider>
          </SpotlightProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light'
});
