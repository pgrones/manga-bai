import { Group, Button, Center, Box, MediaQuery } from '@mantine/core';
import Link from 'next/link';
import { FC } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import SearchInput from '../home/toolbar/searchInput';

const Toolbar: FC<{ searchFn: (value: string) => void }> = ({ searchFn }) => {
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
      <MediaQuery query="(max-width: 410px)" styles={{ display: 'none' }}>
        <Box>
          <Link href="/home" passHref>
            <Button component="a" size="xs" variant="default">
              <Center inline>
                <IoArrowBackOutline />
                <Box ml={5}>Home</Box>
              </Center>
            </Button>
          </Link>
        </Box>
      </MediaQuery>

      <SearchInput searchFn={searchFn} />
    </Group>
  );
};

export default Toolbar;
