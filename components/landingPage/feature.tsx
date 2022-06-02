import { Grid, Paper, Text, ThemeIcon, Title } from '@mantine/core';
import React, { PropsWithChildren } from 'react';

const Feature: React.FC<
  PropsWithChildren<{
    icon: React.ReactNode;
    title: string;
    text: string;
  }>
> = ({ icon, title, text, children }) => {
  return (
    <Paper p="md" style={{ position: 'relative' }}>
      <Grid align="center">
        <Grid.Col span={1}>
          <ThemeIcon size="lg">{icon}</ThemeIcon>
        </Grid.Col>
        <Grid.Col span={11}>
          <Title order={4}>{title}</Title>
        </Grid.Col>
        <Grid.Col span={11} offset={1} py={0}>
          <Text color="dimmed">{text}</Text>
        </Grid.Col>
      </Grid>
      {children}
    </Paper>
  );
};

export default Feature;
