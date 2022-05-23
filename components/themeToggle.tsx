import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import React from 'react';
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';

const ThemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      title={colorScheme === 'dark' ? 'Light mode' : 'Dark mode'}
      onClick={() => toggleColorScheme()}
      size="lg"
      variant="default"
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
