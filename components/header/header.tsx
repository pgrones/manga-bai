import { Container, Group, MediaQuery, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { CSSProperties } from 'react';
import Logo from '../../public/logo.svg';
import ThemeToggle from './themeToggle';
import User from './user';

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
          <ThemeToggle />
          <User />
        </Group>
      </Group>
    </Container>
  );
};

export default Header;
