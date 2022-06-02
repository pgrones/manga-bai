import {
  Anchor,
  Container,
  Group,
  MediaQuery,
  Stack,
  Text,
  Title
} from '@mantine/core';
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
                    height: 35,
                    width: 35
                  } as CSSProperties
                }
              />
              <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
                <Title
                  sx={theme => ({
                    color:
                      theme.colorScheme === 'dark' ? theme.white : theme.black
                  })}
                  order={3}
                >
                  Manga Bai
                </Title>
              </MediaQuery>
            </Group>
          </Text>
        </Link>
        <Stack spacing={2} align="flex-end">
          <Anchor
            href="https://amzn.to/3lEKHwX"
            target="_blank"
            referrerPolicy="no-referrer"
            style={{ lineHeight: 1 }}
          >
            Buy English manga on Amazon.com
          </Anchor>
          <Text size="xs" color="dimmed" style={{ lineHeight: 1 }}>
            (affiliate link)
          </Text>
        </Stack>
        <Stack spacing={2} align="flex-end">
          <Anchor
            href="https://amzn.to/3lEKHwX"
            target="_blank"
            referrerPolicy="no-referrer"
            style={{ lineHeight: 1 }}
          >
            Buy Japanese manga on Amazon.co.jp
          </Anchor>
          <Text size="xs" color="dimmed" style={{ lineHeight: 1 }}>
            (affiliate link)
          </Text>
        </Stack>
        <Group>
          <ThemeToggle />
          <User />
        </Group>
      </Group>
    </Container>
  );
};

export default Header;
