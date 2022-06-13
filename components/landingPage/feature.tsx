import {
  Grid,
  Paper,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme
} from '@mantine/core';
import React, { PropsWithChildren } from 'react';

const Feature: React.FC<
  PropsWithChildren<{
    icon: React.ReactNode;
    title: string;
    text: string;
  }>
> = ({ icon, title, text, children }) => {
  const theme = useMantineTheme();

  return (
    <Paper
      p="md"
      withBorder={theme.colorScheme === 'light'}
      style={{ position: 'relative' }}
    >
      <Grid align="center">
        <Grid.Col span={1}>
          <ThemeIcon size="lg">{icon}</ThemeIcon>
        </Grid.Col>
        <Grid.Col span={11}>
          <Title order={2} style={{ fontSize: 18 }}>
            {title}
          </Title>
        </Grid.Col>
        <Grid.Col span={11} offset={1} pt={0}>
          <Text color="dimmed">{text}</Text>
        </Grid.Col>
      </Grid>
      {children}
    </Paper>
  );
};

export default Feature;
