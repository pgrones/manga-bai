import {
  Group,
  Paper,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme
} from '@mantine/core';

const Feature: React.FC<{
  icon: React.ReactNode;
  title: string;
  text: string;
}> = ({ icon, title, text }) => {
  const theme = useMantineTheme();

  return (
    <Paper
      p="md"
      withBorder={theme.colorScheme === 'light'}
      style={{ position: 'relative', height: '100%' }}
    >
      <Group pb="sm" noWrap>
        <ThemeIcon size="lg">{icon}</ThemeIcon>
        <Title order={2} style={{ fontSize: 18 }}>
          {title}
        </Title>
      </Group>
      <Text color="dimmed">{text}</Text>
    </Paper>
  );
};

export default Feature;
