import { Container, Group, MediaQuery } from '@mantine/core';
import AmazonLink from '../common/amazonLink';
import Logo from './logo';
import ThemeToggle from './themeToggle';
import User from './user';

const Header = () => {
  return (
    <Container size="xl" p={0} style={{ height: '100%' }}>
      <Group position="apart" style={{ height: '100%' }}>
        <MediaQuery smallerThan="xs" styles={{ width: 'auto !important' }}>
          <div style={{ width: 200 }}>
            <Logo />
          </div>
        </MediaQuery>
        <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
          <Group spacing="xl">
            <AmazonLink
              title="Buy English manga on Amazon.com"
              href="https://amzn.to/3lEKHwX"
              link
            />
            <AmazonLink
              title="Buy Japanese manga on Amazon.co.jp"
              href="https://amzn.to/3QGxmmi"
              link
            />
          </Group>
        </MediaQuery>
        <MediaQuery smallerThan="xs" styles={{ width: 'auto !important' }}>
          <Group style={{ width: 200 }} position="right">
            <ThemeToggle />
            <User />
          </Group>
        </MediaQuery>
      </Group>
    </Container>
  );
};

export default Header;
