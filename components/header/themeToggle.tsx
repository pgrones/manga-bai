import {
  ActionIcon,
  MantineNumberSize,
  useMantineColorScheme
} from '@mantine/core';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';

const ThemeToggle: React.FC<{ size?: MantineNumberSize }> = ({ size }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      title={colorScheme === 'dark' ? 'Light mode' : 'Dark mode'}
      onClick={() => toggleColorScheme()}
      size={size ?? 36}
      variant="light"
      sx={theme => ({
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.yellow[4]
            : theme.colors.indigo[9]
      })}
    >
      {colorScheme === 'dark' ? (
        <IoSunnyOutline size={24} />
      ) : (
        <IoMoonOutline size={24} />
      )}
    </ActionIcon>
  );
};

export default ThemeToggle;
