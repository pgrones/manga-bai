import { AppShell, Container, Footer, Header } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { PropsWithChildren, useEffect } from 'react';
import Appheader from '../components/header/header';
import { useUser } from './userProvider';

const Layout: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [user] = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user]);

  return (
    <AppShell
      header={
        <Header
          height={60}
          sx={{ paddingRight: 'var(--removed-scroll-width, 0px)' }}
        >
          <Appheader />
        </Header>
      }
      footer={
        <Footer height={180} sx={{ zIndex: 0 }}>
          <Container size="xl">Test</Container>
        </Footer>
      }
      styles={theme => ({
        main: {
          zIndex: 1,
          marginBottom: 180,
          paddingBottom: theme.spacing.md,
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0]
        }
      })}
      fixed
    >
      <Container size="xl">{children}</Container>
    </AppShell>
  );
};

export default Layout;
