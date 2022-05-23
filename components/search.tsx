import { Box, Button, Text } from '@mantine/core';
import { IoSearchOutline } from 'react-icons/io5';
import { useUser } from '../lib/userProvider';

const Search = () => {
  const [user] = useUser();

  return user ? (
    <Button
      sx={{ width: 250 }}
      styles={theme => ({
        root: {
          paddingLeft: theme.spacing.xs,
          paddingRight: theme.spacing.xs
        },
        inner: { justifyContent: 'space-between' }
      })}
      variant="default"
      rightIcon={
        <Box
          p={5}
          sx={theme => ({
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[1]
          })}
        >
          Ctrl + K
        </Box>
      }
    >
      <IoSearchOutline />
      <Text pl="xs" color="dimmed" weight="normal">
        Search
      </Text>
    </Button>
  ) : null;
};

export default Search;
