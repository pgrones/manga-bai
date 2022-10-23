import {
  Stack,
  Title,
  Button,
  Group,
  Center,
  Box,
  List,
  Text,
  Divider
} from '@mantine/core';
import { NextPage } from 'next';
import Link from 'next/link';
import { IoArrowBackOutline } from 'react-icons/io5';
import Layout from '../components/common/layout';

const ChangeLog: NextPage = () => {
  return (
    <Layout>
      <Group
        py="md"
        sx={theme => ({
          position: 'sticky',
          zIndex: 101,
          top: `var(--mantine-header-height, 0px)`,
          marginTop: -theme.spacing.md,
          backgroundColor: theme.other.getThemeBg(theme)
        })}
      >
        <Link href="/home" passHref>
          <Button component="a" size="xs" variant="default">
            <Center inline>
              <IoArrowBackOutline />
              <Box ml={5}>Home</Box>
            </Center>
          </Button>
        </Link>
        <Title
          order={4}
          sx={theme => ({
            color: theme.colorScheme === 'dark' ? 'white' : undefined
          })}
        >
          Changelog
        </Title>
      </Group>
      <Stack spacing="xl">
        <Stack>
          <Title order={5}>October 23 2022</Title>
          <Title order={6}>
            BETA - Notifications about new available volumes
          </Title>
          <List
            withPadding
            styles={{ item: { maxWidth: 'calc(100% - 20px)' } }}
          >
            <List.Item>
              <Text size="sm">
                Each entry now displays wether a new volume is available for
                (pre-)order
              </Text>
            </List.Item>
            <List.Item>
              <Text size="sm">
                Each entry can be set to track volumes in English or in the
                native language of the entry. This option can be set via the
                edit overlay
              </Text>
            </List.Item>
            <List.Item>
              <Text size="sm">
                The check for new volumes runs everyday or whenever there is a
                substantial change to an entry
              </Text>
            </List.Item>
            <List.Item>
              <Text weight="bold" size="sm">
                Since this feature is in beta, bugs are still to be expected
              </Text>
            </List.Item>
          </List>
          <Title order={6}>Changelog Page</Title>
          <List
            withPadding
            styles={{ item: { maxWidth: 'calc(100% - 20px)' } }}
          >
            <List.Item>
              <Text size="sm">
                Added a changelog page and an indicator to be notified about new
                changes
              </Text>
            </List.Item>
          </List>
          <Divider style={{ width: 'auto' }} />
        </Stack>
        <Stack>
          <Title order={5}>October 20 2022</Title>
          <Title order={6}>Bugfixes</Title>
          <List
            withPadding
            styles={{ item: { maxWidth: 'calc(100% - 20px)' } }}
          >
            <List.Item>
              <Text size="sm">
                Fixed an issue where not all entries of Manga Bai&apos;s custom
                list were displayed on the website when another custom list
                included a complete subset of Manga Bai&apos;s entries
              </Text>
            </List.Item>
          </List>
        </Stack>
      </Stack>
    </Layout>
  );
};

export default ChangeLog;
