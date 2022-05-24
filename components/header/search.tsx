import { Box, Button, MediaQuery, Text } from '@mantine/core';
import { useOs } from '@mantine/hooks';
import { IoSearchOutline } from 'react-icons/io5';
import { useUser } from '../../lib/userProvider';

const Search = () => {
  const [user] = useUser();
  const os = useOs();
  const phone = ['ios', 'android', 'undetermined'].includes(os);

  return user ? (
    <MediaQuery smallerThan="sm" styles={{ width: 180 + 'px !important' }}>
      <Button
        style={{ width: 250 }}
        styles={theme => ({
          root: {
            paddingLeft: theme.spacing.xs,
            paddingRight: theme.spacing.xs
          },
          inner: { justifyContent: 'space-between' }
        })}
        variant="default"
        rightIcon={
          !phone && (
            <Box
              p={5}
              sx={theme => ({
                borderRadius: 3,
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[1]
              })}
            >
              Ctrl + K
            </Box>
          )
        }
      >
        <IoSearchOutline size={18} />
        <Text pl="xs" color="dimmed" weight="normal">
          Search
        </Text>
      </Button>
    </MediaQuery>
  ) : null;
};

export default Search;
