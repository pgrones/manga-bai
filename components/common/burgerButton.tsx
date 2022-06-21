import {
  Burger,
  Center,
  Group,
  MediaQuery,
  Paper,
  useMantineTheme
} from '@mantine/core';
import { useState } from 'react';
import AmazonLink from './amazonLink';

const BurgerButton = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <MediaQuery largerThan="md" styles={{ display: 'none' }}>
        <Paper
          p="md"
          withBorder
          shadow="xl"
          sx={theme => ({
            position: 'fixed',
            bottom: theme.spacing.xl,
            right: theme.spacing.md,
            zIndex: 5,
            width: 50,
            height: 50
          })}
        >
          <Center style={{ height: '100%' }}>
            <Burger
              size={30}
              color={theme.colors[theme.primaryColor][6]}
              opened={opened}
              onClick={() => setOpened(o => !o)}
              aria-label="Open navigation"
            />
          </Center>
        </Paper>
      </MediaQuery>
      {opened && (
        <MediaQuery largerThan="md" styles={{ display: 'none' }}>
          <Paper
            p="sm"
            withBorder
            shadow="xl"
            sx={theme => ({
              position: 'fixed',
              bottom: theme.spacing.xl,
              right: theme.spacing.md,
              zIndex: 4,
              width: `min(calc(100% - ${theme.spacing.md}px * 2), 350px)`,
              height: 84
            })}
          >
            <Group>
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
          </Paper>
        </MediaQuery>
      )}
    </>
  );
};

export default BurgerButton;
