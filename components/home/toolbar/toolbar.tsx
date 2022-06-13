import { Group, Title } from '@mantine/core';
import React from 'react';
import LayoutToggle from './layoutToggle';
import SearchInput from './searchInput';
import StatusSelect from './statusSelect';

const Toolbar: React.ForwardRefExoticComponent<
  {
    title: string;
  } & React.RefAttributes<HTMLDivElement>
> = React.forwardRef(({ title }, ref) => {
  return (
    <Group
      ref={ref}
      py="md"
      sx={theme => ({
        position: 'sticky',
        zIndex: 101,
        top: `var(--mantine-header-height, 0px)`,
        marginTop: -theme.spacing.md,
        backgroundColor: theme.other.getThemeBg(theme)
      })}
      position="apart"
    >
      <Title order={4}>{title}</Title>
      <Group spacing="xl">
        <SearchInput />
        <StatusSelect />
        <LayoutToggle />
      </Group>
    </Group>
  );
});

export default Toolbar;
