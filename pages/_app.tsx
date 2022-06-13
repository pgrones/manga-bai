import { ApolloProvider } from '@apollo/client';
import {
  ColorScheme,
  ColorSchemeProvider,
  DefaultMantineColor,
  MantineProvider,
  MantineTheme,
  MantineThemeOverride
} from '@mantine/core';
import { useColorScheme, useLocalStorage } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useApollo } from '../apollo/client';
import MetaTags from '../components/common/metaTags';
import { analytics } from '../lib/firebase/firebase';
import UserProvider from '../lib/hooks/provider/userProvider';
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
  const [colorScheme, setColorScheme] = useLocalStorage<
    ColorScheme | undefined
  >({
    key: 'mantine-color-scheme',
    defaultValue: undefined,
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

  const getThemeBg = (theme: MantineTheme) =>
    theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0];

  useEffect(() => {
    if (!colorScheme && preferredColorScheme !== 'light') {
      toggleColorScheme(preferredColorScheme);
    }
  }, [preferredColorScheme]);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      analytics();
    }
  }, []);

  return (
    <>
      <MetaTags
        title="Manga Bai: Track your preordered, bought, and owned manga and light novels using your existing AniList account"
        description="Track your preordered, bought, and owned manga and light novels using your existing AniList account"
      />

      <ColorSchemeProvider
        colorScheme={colorScheme ?? 'light'}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            ...theme,
            colorScheme,
            primaryColor,
            other: {
              setSiteColor,
              getThemeBg
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
