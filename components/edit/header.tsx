import { Button, CloseButton, Group, Image, Title, Text } from '@mantine/core';
import React from 'react';
import { Media } from '../../apollo/queries/mediaQuery';

const Header: React.FC<Media & { close: () => void }> = ({
  bannerImage,
  coverImage,
  title,
  close
}) => {
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
        noWrap
      >
        <Image
          radius="sm"
          src={coverImage.large}
          alt={title.userPreferred}
          height={140}
          width={100}
          withPlaceholder
        />
        <Text lineClamp={2} style={{ wordBreak: 'break-word' }}>
          <Title
            order={5}
            mt="xl"
            mr="md"
            sx={theme => ({ color: theme.white })}
          >
            {title.userPreferred}
          </Title>
        </Text>
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
        onClick={close}
      />
    </>
  );
};

export default Header;
