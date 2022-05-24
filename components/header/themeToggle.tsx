import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';

const ThemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      title={colorScheme === 'dark' ? 'Light mode' : 'Dark mode'}
      onClick={() => toggleColorScheme()}
      size={36}
      variant="default"
      sx={theme => ({
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.yellow[4]
            : theme.colors.indigo[9]
      })}
    >
      {colorScheme === 'dark' ? (
        <IoSunnyOutline size={26} />
      ) : (
        <IoMoonOutline size={26} />
      )}
    </ActionIcon>
  );
};

export default ThemeToggle;
