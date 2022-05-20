import {
  ActionIcon,
  Avatar,
  Button,
  Container,
  Group,
  Title,
  useMantineColorScheme
} from '@mantine/core';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';
import { useUser } from './userProvider';

const Header = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [user, logout] = useUser();

  return (
    <Container>
      <Group position="apart">
        <Title order={3}>Manga Bai</Title>
        <Group>
          <ActionIcon
            title={colorScheme === 'dark' ? 'Light mode' : 'Dark mode'}
            onClick={() => toggleColorScheme()}
          >
            {colorScheme === 'dark' ? (
              <IoSunnyOutline size={24} />
            ) : (
              <IoMoonOutline size={24} />
            )}
          </ActionIcon>
          {user && (
            <>
              <Avatar src={user.avatar.large} />
              <Button onClick={logout}>Logout</Button>
            </>
          )}
        </Group>
      </Group>
    </Container>
  );
};

export default Header;
