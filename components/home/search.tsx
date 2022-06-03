import { MediaQuery, Text, TextInput } from '@mantine/core';
import { useHotkeys, useOs } from '@mantine/hooks';
import { useRef } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

const Search = () => {
  const os = useOs();
  const phone = ['ios', 'android'].includes(os);
  const searchRef = useRef<HTMLInputElement>(null);
  useHotkeys([
    ['mod+K', () => searchRef.current?.focus() || searchRef.current?.select()]
  ]);

  return (
    <MediaQuery smallerThan="sm" styles={{ width: 180 + 'px !important' }}>
      <TextInput
        ref={searchRef}
        type="search"
        size="xs"
        placeholder="Search"
        icon={<IoSearchOutline size={16} />}
        rightSectionWidth={62}
        styles={{ rightSection: { pointerEvents: 'none' } }}
        rightSection={
          !phone && (
            <Text size="xs" color="dimmed" weight="normal">
              Ctrl + K
            </Text>
          )
        }
      />
    </MediaQuery>
  );
};

export default Search;
