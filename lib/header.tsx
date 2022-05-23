import { Container, Group, Title } from '@mantine/core';
import Link from 'next/link';
import Search from '../components/search';
import ThemeToggle from '../components/themeToggle';
import User from '../components/user';

const Header = () => {
  return (
    <Container size="xl">
      <Group position="apart">
        <Link href="/">
          <Title order={3}>Manga Bai</Title>
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
