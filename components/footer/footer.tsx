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
              <Text
                component="a"
                href="https://www.buymeacoffee.com/alzariel"
                target="_blank"
                referrerPolicy="no-referrer"
                size="sm"
              >
                Buy me a coffee
              </Text>
              <AmazonLink title="Amazon.com" href="https://amzn.to/3lEKHwX" />
              <AmazonLink title="Amazon.co.jp" href="https://amzn.to/3QGxmmi" />
            </Stack>
            <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
              <Stack spacing={8}>
                <Text weight="bold" pb={5}>
                  Links
                </Text>
                <Text
                  component="a"
                  href="https://anilist.co/"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  size="sm"
                >
                  AniList
                </Text>
                <Text
                  component="a"
                  href="https://github.com/pgr3931/manga-bai"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  size="sm"
                >
                  Github
                </Text>
                <Text
                  component="a"
                  href="/sitemap.xml"
                  target="_blank"
                  referrerPolicy="no-referrer"
                  size="sm"
                >
                  Sitemap
                </Text>
              </Stack>
            </MediaQuery>
            <Stack spacing={8}>
              <Text weight="bold" pb={5}>
                Contact
              </Text>
              <Text
                component="a"
                href="https://anilist.co/user/Alzariel/"
                target="_blank"
                referrerPolicy="no-referrer"
                size="sm"
              >
                AniList
              </Text>
              <Text
                component="a"
                href="mailto:animeappsmadereal@gmail.com"
                rel="author"
                size="sm"
              >
                E-Mail
              </Text>
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
