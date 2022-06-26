import { AppShell, Container, Footer, Header } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';
import AppFooter from '../footer/footer';
import AppHeader from '../header/header';
import BurgerButton from './burgerButton';

const Layout: FC<PropsWithChildren<{ is404?: boolean }>> = props => {
  const { children, is404 } = props;

  return (
    <AppShell
      header={
        <Header
          height={55}
          sx={theme => ({
            paddingRight: `calc(var(--removed-scroll-width, 0px) + ${theme.spacing.md}px)`,
            paddingLeft: theme.spacing.md
          })}
        >
          <AppHeader />
        </Header>
      }
      footer={
        <Footer
          height={250}
          sx={theme => ({
            paddingRight: `calc(var(--removed-scroll-width, 0px) + ${theme.spacing.md}px)`,
            paddingLeft: theme.spacing.md,
            zIndex: is404 ? 1 : 0
          })}
        >
          <AppFooter />
        </Footer>
      }
      styles={theme => ({
        main: {
          zIndex: is404 ? 0 : 1,
          marginBottom: is404 ? 0 : 'var(--mantine-footer-height, 0px)',
          paddingBottom: theme.spacing.md,
          backgroundColor: theme.other.getThemeBg(theme)
        }
      })}
      fixed
    >
      <Container size="xl" p={0}>
        {children}
        <BurgerButton />
      </Container>
    </AppShell>
  );
};

export default Layout;
