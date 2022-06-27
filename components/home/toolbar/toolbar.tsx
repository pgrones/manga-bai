import { ActionIcon, Group, MediaQuery, Title } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { forwardRef, ForwardRefExoticComponent, useEffect } from 'react';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import LayoutToggle from './layoutToggle';
import SearchInput from './searchInput';
import StatusSelect from './statusSelect';
import { ToolbarProps } from './toolbarTypes';

const Toolbar: ForwardRefExoticComponent<ToolbarProps> = forwardRef(
  ({ title, recalculate }, ref) => {
    const [opened, { toggle, close, open }] = useDisclosure(true);
    const matches = useMediaQuery('(max-width: 410px)');

    useEffect(() => {
      if (matches) close();
      else open();
    }, [matches]);

    useEffect(recalculate, [opened]);

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
        <MediaQuery
          query="(min-width: 871px)"
          styles={{ width: 'auto !important' }}
        >
          <Group
            position="apart"
            style={{ width: '100%', flexWrap: 'wrap-reverse' }}
          >
            <Title
              order={4}
              sx={theme => ({
                width: `min(calc(100vw - 30px - ${theme.spacing.md}px * 3), 225px)`
              })}
            >
              {title}
            </Title>
            <MediaQuery query="(min-width: 411px)" styles={{ display: 'none' }}>
              <ActionIcon size={30} variant="filled" onClick={toggle}>
                <IoEllipsisHorizontal />
              </ActionIcon>
            </MediaQuery>
            <MediaQuery query="(min-width: 871px)" styles={{ display: 'none' }}>
              <MediaQuery
                query="(max-width: 410px)"
                styles={{ display: 'none' }}
              >
                <div>
                  <LayoutToggle />
                </div>
              </MediaQuery>
            </MediaQuery>
          </Group>
        </MediaQuery>
        {opened && (
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
              <MediaQuery
                query="(max-width: 870px) and (min-width: 411px)"
                styles={{ display: 'none' }}
              >
                <div>
                  <LayoutToggle />
                </div>
              </MediaQuery>
            </Group>
          </MediaQuery>
        )}
      </Group>
    );
  }
);

export default Toolbar;
