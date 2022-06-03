import {
  Button,
  ColorSwatch,
  Group,
  Popover,
  useMantineTheme
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect } from 'react';
import { IoCheckmarkOutline, IoColorPaletteOutline } from 'react-icons/io5';

const ColorPicker: React.FC<{
  setCloseOnClickOutside: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setCloseOnClickOutside }) => {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);

  useEffect(() => {
    setCloseOnClickOutside(!opened);
  }, [opened]);

  const swatches = Object.keys(theme.colors).map(color => (
    <ColorSwatch
      key={color}
      component="button"
      color={theme.colors[color][6]}
      radius="sm"
      onClick={() => theme.other.setSiteColor(color)}
      style={{ color: '#fff', cursor: 'pointer' }}
    >
      {color === theme.primaryColor && <IoCheckmarkOutline />}
    </ColorSwatch>
  ));

  return (
    <Popover
      opened={opened}
      onClose={toggle}
      target={
        <Button
          variant="subtle"
          color="gray"
          leftIcon={<IoColorPaletteOutline size={16} />}
          onClick={toggle}
          styles={{ inner: { justifyContent: 'flex-start' } }}
        >
          Site color
        </Button>
      }
      styles={{ inner: { padding: 5 } }}
      position="bottom"
      withArrow
    >
      <Group position="center" spacing="xs">
        {swatches}
      </Group>
    </Popover>
  );
};

export default ColorPicker;
