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

export const ColorPicker: React.FC = () => {
  const theme = useMantineTheme();

  return (
    <Group spacing="xs">
      {Object.keys(theme.colors).map(color => (
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
      ))}
    </Group>
  );
};

const ColorPickerPopover: React.FC<{
  setCloseOnClickOutside: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setCloseOnClickOutside }) => {
  const [opened, { toggle, close }] = useDisclosure(false);

  useEffect(() => {
    setCloseOnClickOutside(!opened);
  }, [opened]);

  return (
    <Popover
      opened={opened}
      onClose={close}
      target={
        <Button
          variant="subtle"
          color="gray"
          leftIcon={<IoColorPaletteOutline size={16} />}
          onClick={toggle}
          styles={{
            root: { width: '100%' },
            inner: { justifyContent: 'flex-start' }
          }}
        >
          Site color
        </Button>
      }
      styles={{ inner: { padding: 5 } }}
      position="bottom"
      withArrow
    >
      <ColorPicker />
    </Popover>
  );
};

export default ColorPickerPopover;
