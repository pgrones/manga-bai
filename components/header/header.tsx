import { Container, Group, MediaQuery, Text, Title } from '@mantine/core';
import Link from 'next/link';
import Search from './search';
import ThemeToggle from './themeToggle';
import User from './user';
import Logo from '../../public/logo.svg';
import { CSSProperties } from 'react';

const Header = () => {
  return (
    <Container size="xl" style={{ height: '100%' }}>
      <Group position="apart" style={{ height: '100%' }}>
        <Link href="/home" passHref>
          <Text component="a">
            <Group style={{ cursor: 'pointer' }}>
              <Logo
                style={
                  {
                    height: 40,
                    width: 40
                  } as CSSProperties
                }
              />
              <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
                <Title
                  sx={theme => ({
                    color:
                      theme.colorScheme === 'dark' ? theme.white : theme.black
                  })}
                  order={2}
                >
                  Manga Bai
                </Title>
              </MediaQuery>
            </Group>
          </Text>
        </Link>
        <Group>
          <Search />
          <ThemeToggle />
          <User />
        </Group>
      </Group>
    </Container>
  );
};

export default Header;
