import {
  Button,
  CloseButton,
  Group,
  Title,
  useMantineTheme
} from '@mantine/core';
import Image from "next/legacy/image";
import { FC } from 'react';
import { getBorderRadius } from '../../lib/helper/radius';
import ImageFallback from '../common/ImageFallback';
import { HeaderProps } from './headerTypes';

const Header: FC<HeaderProps> = props => {
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
        p="md"
        align="flex-end"
        style={{ position: 'absolute', bottom: 0, width: '100%' }}
        noWrap
      >
        <div
          style={{
            position: 'relative',
            bottom: -46,
            height: 140,
            width: 100,
            minWidth: 100
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
        <Group style={{ minHeight: 36 }}>
          <Title
            order={5}
            sx={theme => ({
              color: theme.white,
              fontWeight: 'normal'
            })}
          >
            {title.userPreferred}
          </Title>
        </Group>
        <Button
          mt="xl"
          form="form"
          type="submit"
          ml="auto"
          title="Save changes"
        >
          Save
        </Button>
      </Group>
      <CloseButton
        title="Close"
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
