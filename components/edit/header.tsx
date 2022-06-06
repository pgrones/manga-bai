import {
  Button,
  CloseButton,
  Group,
  Text,
  Title,
  useMantineTheme
} from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import { getBorderRadius } from '../../lib/helper/radius';
import ImageFallback from '../common/ImageFallback';
import { HeaderProps } from './headerTypes';

const Header: React.FC<HeaderProps> = props => {
  const { bannerImage, coverImage, title, close } = props;
  const theme = useMantineTheme();

  return (
    <div style={{ height: 165, position: 'relative' }}>
      <ImageFallback
        layout="fill"
        objectFit="cover"
        src={bannerImage}
        fallBackSrc={coverImage.large}
        alt={title.userPreferred}
        style={{ opacity: 0.3 }}
      />
      <Group
        px="md"
        style={{ position: 'absolute', bottom: -30, width: '100%' }}
        noWrap
      >
        <div
          style={{
            position: 'relative',
            height: 140,
            width: 100
          }}
        >
          <Image
            layout="fill"
            objectFit="cover"
            src={coverImage.large}
            alt={title.userPreferred}
            style={getBorderRadius(theme)}
            sizes="100px"
          />
        </div>
        <Text lineClamp={2} style={{ wordBreak: 'break-word' }}>
          <Title
            order={5}
            mt="xl"
            mr="md"
            sx={theme => ({ color: theme.white, fontWeight: 'normal' })}
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
    </div>
  );
};

export default Header;
