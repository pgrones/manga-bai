import { Grid } from '@mantine/core';
import { IoBagCheck, IoColorPalette, IoNotifications } from 'react-icons/io5';
import { SiAnilist } from 'react-icons/si';
import { WAITING } from '../../lib/helper/constants';
import Feature from './feature';

const Features = () => {
  return (
    <Grid gutter="xl" py="xs">
      <Grid.Col sm={6}>
        <Feature
          icon={<IoBagCheck size={24} />}
          title="Keep track of all the manga you have preordered"
          text="Remembering if and where you bought the newest volume of a manga or light novel can be quite difficult. With Manga Bai you'll never preorder a volume twice again."
        />
      </Grid.Col>
      <Grid.Col sm={6} style={{ opacity: 0.5 }}>
        <Feature
          icon={<IoNotifications size={24} />}
          title="Get notifications when new volumes are available"
          text="Available as soon as the site has access to the Amazon API. Use the affiliate links at the top of the site make this possible."
          // text="Manga Bai lets you know when a new volume of a series you're reading is on sale on Amazon. You can choose wether you prefer English or Japanese volumes."
        />
      </Grid.Col>
      <Grid.Col sm={6}>
        <Feature
          icon={<SiAnilist size={24} />}
          title="Use your existing AniList account"
          text={`Login with your AniList account and synchronize your changes. The custom list "${WAITING}" lets your updates appear on AniList as well as Manga Bai.`}
        />
      </Grid.Col>
      <Grid.Col sm={6}>
        <Feature
          icon={<IoColorPalette size={24} />}
          title="Change it to your liking"
          text="Change the layout and appearance of your list or exclude entries you don't want to track. At its core, Manga Bai is designed to feel similar to AniList."
        />
      </Grid.Col>
    </Grid>
  );
};

export default Features;
