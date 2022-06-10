import { Stack, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { WAITING } from '../../lib/helper/constants';

const NoData = () => {
  const [kaomoji, setKaomoji] = useState<string>();

  useEffect(() => {
    setKaomoji(
      [
        '~(>_<~)',
        '(×_×)',
        '٩(× ×)۶',
        '(ﾒ﹏ﾒ)',
        '[ ± _ ± ]',
        '(￣ω￣;)',
        'ლ(ಠ_ಠ ლ)',
        '(＠_＠)',
        '(⊙_⊙)',
        "┐('～`;)┌"
      ][Math.floor(Math.random() * 10)]
    );
  }, []);

  return (
    <Stack
      justify="center"
      align="center"
      sx={theme => ({
        height: `calc(100vh - var(--mantine-header-height) - ${
          theme.spacing.md * 2
        }px)`
      })}
    >
      <Title order={2}>{kaomoji}</Title>
      <Title order={3}>Could not find any entries </Title>
      <Text>
        Make sure that either your &quot;Reading&quot; list or the custom list
        &quot;{WAITING}&quot; has at least one entry.
      </Text>
    </Stack>
  );
};

export default NoData;
