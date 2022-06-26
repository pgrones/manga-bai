import {
  Container,
  Divider,
  Group,
  MediaQuery,
  Stack,
  Text
} from '@mantine/core';
import AmazonLink from '../common/amazonLink';
import Logo from '../header/logo';
import ExternalLink from './externalLink';

const Footer = () => {
  return (
    <Container size="xl" px={0} pt="xl" pb="xl" style={{ height: '100%' }}>
      <Stack style={{ height: '100%' }} justify="space-around">
        <Group position="apart" align="flex-start">
          <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
            <Stack spacing="xs">
              <Logo />
              <Text size="sm">
                Track your preordered, bought, and owned manga and light novels
              </Text>
            </Stack>
          </MediaQuery>

          <Group spacing={48} align="flex-start">
            <Stack spacing={8}>
              <Text weight="bold" pb={5}>
                Support the site
              </Text>
              <ExternalLink href="https://www.buymeacoffee.com/alzariel">
                Buy me a coffee
              </ExternalLink>
              <AmazonLink title="Amazon.com" href="https://amzn.to/3lEKHwX" />
              <AmazonLink title="Amazon.co.jp" href="https://amzn.to/3QGxmmi" />
            </Stack>
            <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
              <Stack spacing={8}>
                <Text weight="bold" pb={5}>
                  Links
                </Text>
                <ExternalLink href="https://anilist.co/">AniList</ExternalLink>
                <ExternalLink href="https://github.com/pgr3931/manga-bai">
                  Github
                </ExternalLink>
                <ExternalLink href="/sitemap.xml">Sitemap</ExternalLink>
              </Stack>
            </MediaQuery>
            <Stack spacing={8}>
              <Text weight="bold" pb={5}>
                Contact
              </Text>
              <ExternalLink href="https://anilist.co/user/Alzariel/">
                AniList
              </ExternalLink>
              <Text
                component="a"
                href="mailto:animeappsmadereal@gmail.com"
                rel="author"
                size="sm"
              >
                E-Mail
              </Text>
              <ExternalLink href="https://github.com/pgr3931/manga-bai/issues/new">
                Bug Report
              </ExternalLink>
            </Stack>
          </Group>
        </Group>

        <div>
          <Divider mb={5} />
          <Text size="sm">
            As an Amazon Associate I earn from qualifying purchases.
          </Text>
        </div>
      </Stack>
    </Container>
  );
};

export default Footer;
