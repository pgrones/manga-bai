import { Group, MediaQuery, Title } from '@mantine/core';
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
        backgroundColor: theme.other.getThemeBg(theme),
        flexWrap: 'wrap-reverse'
      })}
      position="apart"
    >
      <MediaQuery largerThan="sm" styles={{ width: 'auto !important' }}>
        <Group
          position="apart"
          style={{ width: '100%', flexWrap: 'wrap-reverse' }}
        >
          <Title order={4}>{title}</Title>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <div>
              <LayoutToggle />
            </div>
          </MediaQuery>
        </Group>
      </MediaQuery>
      <MediaQuery
        smallerThan="xs"
        styles={{
          justifyContent: 'space-between',
          gap: '16px !important',
          width: '100%'
        }}
      >
        <Group spacing="xl">
          <SearchInput />
          <StatusSelect />
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <div>
              <LayoutToggle />
            </div>
          </MediaQuery>
        </Group>
      </MediaQuery>
    </Group>
  );
});

export default Toolbar;
