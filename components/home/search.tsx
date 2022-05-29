import { Button, MediaQuery, Text } from '@mantine/core';
import { useOs } from '@mantine/hooks';
import { IoSearchOutline } from 'react-icons/io5';

const Search = () => {
  const os = useOs();
  const phone = ['ios', 'android'].includes(os);

  return (
    <MediaQuery smallerThan="sm" styles={{ width: 180 + 'px !important' }}>
      <Button
        size="xs"
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
            <Text size="xs" color="dimmed" weight="normal">
              Ctrl + K
            </Text>
          )
        }
      >
        <IoSearchOutline size={16} />
        <Text pl="xs" size="xs" color="dimmed" weight="normal">
          Search
        </Text>
      </Button>
    </MediaQuery>
  );
};

export default Search;
