import {
  Group,
  Button,
  Center,
  Box,
  MediaQuery,
  Title,
  useMantineTheme
} from '@mantine/core';
import Link from 'next/link';
import { FC } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import SearchInput from '../home/toolbar/searchInput';

const Toolbar: FC<{ searchFn: (value: string) => void }> = ({ searchFn }) => {
  const theme = useMantineTheme();

  return (
    <Group
      position="apart"
      py="md"
      sx={theme => ({
        position: 'sticky',
        zIndex: 101,
        top: `var(--mantine-header-height, 0px)`,
        marginTop: -theme.spacing.md,
        backgroundColor: theme.other.getThemeBg(theme)
      })}
    >
      <MediaQuery query="(max-width: 526px)" styles={{ display: 'none' }}>
        <Group>
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
            color={theme.colorScheme === 'dark' ? 'white' : undefined}
          >
            Removed Entries
          </Title>
        </Group>
      </MediaQuery>

      <SearchInput searchFn={searchFn} />
    </Group>
  );
};

export default Toolbar;
