import { ApolloProvider } from '@apollo/client';
import {
  ColorScheme,
  ColorSchemeProvider,
  DefaultMantineColor,
  MantineProvider,
  MantineThemeOverride
} from '@mantine/core';
import { useColorScheme, useLocalStorage } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { AppProps } from 'next/app';
import Head from 'next/head';
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

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps?.initialApolloState);
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true
  });
  const [primaryColor, setPrimaryColor] = useLocalStorage<DefaultMantineColor>({
    key: 'mantine-site-color',
    defaultValue: 'indigo',
    getInitialValueInEffect: true
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    document.documentElement.style.colorScheme = nextColorScheme;
  };

  const setSiteColor = (value: DefaultMantineColor) => {
    setPrimaryColor(value);
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
