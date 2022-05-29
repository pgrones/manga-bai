import { AppShell, Container, Footer, Header } from '@mantine/core';
import React, { PropsWithChildren } from 'react';
import Appheader from './header/header';

const Layout: React.FC<PropsWithChildren<{ is404?: boolean }>> = ({
  children,
  is404
}) => {
  return (
    <AppShell
      header={
        <Header
          height={55}
          sx={{ paddingRight: 'var(--removed-scroll-width, 0px)' }}
        >
          <Appheader />
        </Header>
      }
      footer={
        <Footer
          height={180}
          sx={{
            zIndex: is404 ? 1 : 0,
            paddingRight: 'var(--removed-scroll-width, 0px)'
          }}
        >
          <Container size="xl">
            As an Amazon Associate I earn from qualifying purchases.
          </Container>
        </Footer>
      }
      styles={theme => ({
        main: {
          zIndex: is404 ? 0 : 1,
          marginBottom: is404 ? 0 : 'var(--mantine-footer-height, 0px)',
          paddingBottom: theme.spacing.md,
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[9]
              : theme.colors.gray[1]
        }
      })}
      fixed
    >
      <Container size="xl">{children}</Container>
    </AppShell>
  );
};

export default Layout;
