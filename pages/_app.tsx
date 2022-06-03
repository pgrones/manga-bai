import { ApolloProvider } from '@apollo/client';
import {
  ColorScheme,
  ColorSchemeProvider,
  DefaultMantineColor,
  MantineProvider,
  MantineThemeOverride
} from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { getCookie, setCookies } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useApollo } from '../apollo/client';
import UserProvider from '../lib/hooks/userProvider';
import '../styles/globalStyles.css';

const theme: MantineThemeOverride = {
  fontFamily:
    "'Inter',-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
  headings: {
    fontFamily:
      "'Inter',-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji"
  },
  loader: 'bars'
};

export default function App(
  props: AppProps & { colorScheme: ColorScheme; siteColor: DefaultMantineColor }
) {
  const { Component, pageProps } = props;
  const apolloClient = useApollo(pageProps?.initialApolloState);
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );
  const [primaryColor, setPrimaryColor] = useState<DefaultMantineColor>(
    props.siteColor
  );

  useEffect(() => {
    if (
      !getCookie('mantine-color-scheme') &&
      preferredColorScheme !== 'light' &&
      colorScheme !== preferredColorScheme
    ) {
      toggleColorScheme(preferredColorScheme);
    }
  }, [preferredColorScheme]);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30
    });
    document.documentElement.style.colorScheme = nextColorScheme;
  };

  const setSiteColor = (value: DefaultMantineColor) => {
    setPrimaryColor(value);
    setCookies('mantine-site-color', value, {
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

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            ...theme,
            colorScheme,
            primaryColor,
            other: {
              setSiteColor
            }
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider>
            <ModalsProvider>
              <ApolloProvider client={apolloClient}>
                <UserProvider>
                  <Component {...pageProps} />
                </UserProvider>
              </ApolloProvider>
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
  siteColor: getCookie('mantine-site-color', ctx) || 'indigo'
});
