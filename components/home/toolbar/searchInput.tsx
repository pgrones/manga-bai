import { CloseButton, MediaQuery, Text, TextInput } from '@mantine/core';
import { useHotkeys, useInputState, useOs } from '@mantine/hooks';
import { useEffect, useRef } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { useMedia } from '../../../lib/hooks/provider/mediaProvider';

const SearchInput = () => {
  const os = useOs();
  const phone = ['ios', 'android'].includes(os);
  const { search } = useMedia();
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useInputState('');
  useHotkeys([
    ['mod+S', () => searchRef.current?.focus() || searchRef.current?.select()]
  ]);

  useEffect(() => {
    search(searchValue);
  }, [searchValue]);

  return (
    <MediaQuery smallerThan="sm" styles={{ width: 180 + 'px !important' }}>
      <TextInput
        ref={searchRef}
        value={searchValue}
        onChange={setSearchValue}
        type="search"
        size="xs"
        placeholder="Search"
        icon={<IoSearchOutline size={16} />}
        rightSectionWidth={searchValue ? 25 : 62}
        styles={{
          root: { width: 270 },
          rightSection: { pointerEvents: searchValue ? 'auto' : 'none' }
        }}
        rightSection={
          searchValue ? (
            <CloseButton
              size="xs"
              variant="transparent"
              onClick={() => setSearchValue('')}
            />
          ) : (
            !phone && (
              <Text size="xs" color="dimmed" weight="normal">
                {os === 'macos' ? '⌘' : 'Ctrl'} + S
              </Text>
            )
          )
        }
      />
    </MediaQuery>
  );
};

export default SearchInput;
