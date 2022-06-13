import { AppShell, Container, Footer, Header } from '@mantine/core';
import React, { PropsWithChildren } from 'react';
import AppHeader from '../header/header';
import AppFooter from '../footer/footer';

const Layout: React.FC<PropsWithChildren<{ is404?: boolean }>> = ({
  children,
  is404
}) => {
  return (
    <AppShell
      header={
        <Header
          height={55}
          sx={{
            paddingRight: 'var(--removed-scroll-width, 0px)'
          }}
        >
          <AppHeader />
        </Header>
      }
      footer={
        <Footer
          height={300}
          sx={{
            zIndex: is404 ? 1 : 0,
            paddingRight: 'var(--removed-scroll-width, 0px)'
          }}
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
      <Container size="xl">{children}</Container>
    </AppShell>
  );
};

export default Layout;
