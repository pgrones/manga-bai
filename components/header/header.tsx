import { Container, Group } from '@mantine/core';
import AmazonLink from '../common/amazonLink';
import Logo from './logo';
import ThemeToggle from './themeToggle';
import User from './user';

const Header = () => {
  return (
    <Container size="xl" style={{ height: '100%' }}>
      <Group position="apart" style={{ height: '100%' }}>
        <Logo />
        <Group spacing="xl">
          <AmazonLink
            title="Buy English manga on Amazon.com"
            href='"https://amzn.to/3lEKHwX"'
            link
          />
          <AmazonLink
            title="Buy Japanese manga on Amazon.co.jp"
            href='"https://amzn.to/3lEKHwX"'
            link
          />
        </Group>
        <Group>
          <ThemeToggle />
          <User />
        </Group>
      </Group>
    </Container>
  );
};

export default Header;
