import { Button, CloseButton, Group, Image, Title } from '@mantine/core';
import React from 'react';
import { Media } from '../../apollo/queries/mediaQuery';

const Header: React.FC<Media> = ({ bannerImage, coverImage, title }) => {
  return (
    <>
      <Image
        src={bannerImage}
        alt={title.userPreferred}
        style={{ opacity: 0.4 }}
        height={165}
        withPlaceholder
      />
      <Group
        px="md"
        style={{ position: 'absolute', bottom: -30, width: '100%' }}
      >
        <Image
          radius="sm"
          src={coverImage.large}
          alt={title.userPreferred}
          height={140}
          width={100}
          withPlaceholder
        />
        <Title order={5} mt="xl" sx={theme => ({ color: theme.white })}>
          {title.userPreferred}
        </Title>
        <Button mt="xl" form="form" type="submit" ml="auto">
          Save
        </Button>
      </Group>
      <CloseButton
        size="lg"
        sx={theme => ({
          'color': theme.white,
          '&:hover': {
            backgroundColor: theme.colors.dark[4] + ' !Important'
          },
          'position': 'absolute',
          'top': theme.spacing.xs,
          'right': theme.spacing.xs
        })}
      />
    </>
  );
};

export default Header;
