import {
  ActionIcon,
  Button,
  Container,
  Divider,
  Group,
  MediaQuery
} from '@mantine/core';
import Image from "next/legacy/image";
import MangaMart from '../../public/mangamart.webp';
import Logo from './logo';
import ThemeToggle from './themeToggle';
import User from './user';

const Header = () => {
  return (
    <Container size="xl" p={0} style={{ height: '100%' }}>
      <Group position="apart" style={{ height: '100%' }}>
        <Logo />
        <Group>
          <MediaQuery
            query="(min-width: 635px)"
            styles={{ display: 'inline-block' }}
          >
            <Button
              component="a"
              target="_blank"
              referrerPolicy="no-referrer"
              href="https://mangamart.com/mangabai"
              leftIcon={
                <Image src={MangaMart} alt="MangaMart" width={39} height={26} />
              }
              variant="gradient"
              gradient={{ from: '#f16823', to: '#0e4c95', deg: 90 }}
              styles={theme => ({
                root: {
                  display: 'none',
                  backgroundImage:
                    'linear-gradient(to right, #FFFFFF 0px, #f16823 80px, #0e4c95 100%) !important',
                  border:
                    theme.colorScheme === 'light' ? '1px solid #dee2e6' : 'none'
                }
              })}
            >
              Buy Manga on MangaMart
            </Button>
          </MediaQuery>

          <MediaQuery
            query="(max-width: 635px)"
            styles={{ display: 'flex !important' }}
          >
            <ActionIcon
              variant="filled"
              component="a"
              target="_blank"
              referrerPolicy="no-referrer"
              href="https://mangamart.com/mangabai"
              style={{
                backgroundColor: 'white',
                width: 39 + 18 * 2,
                display: 'none'
              }}
              size={36}
              title="Buy Manga on MangaMart"
            >
              <Image src={MangaMart} alt="MangaMart" width={39} height={26} />
            </ActionIcon>
          </MediaQuery>

          <Divider orientation="vertical" />
          <ThemeToggle />
          <User />
        </Group>
      </Group>
    </Container>
  );
};

export default Header;
