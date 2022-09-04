import {
  Button,
  ColorSwatch,
  Group,
  Popover,
  useMantineTheme
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC, useEffect } from 'react';
import { IoCheckmarkOutline, IoColorPaletteOutline } from 'react-icons/io5';
import { ColorPickerProps } from './colorPickerTypes';

export const ColorPicker: FC = () => {
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

const ColorPickerPopover: FC<ColorPickerProps> = props => {
  const [opened, { toggle, close }] = useDisclosure(false);

  useEffect(() => {
    props.setCloseOnClickOutside(!opened);
  }, [opened]);

  return (
    <Popover opened={opened} onClose={close} position="bottom" withArrow>
      <Popover.Target>
        <Button
          leftIcon={<IoColorPaletteOutline size={16} />}
          onClick={toggle}
          styles={theme => ({
            root: {
              'width': '100%',
              'backgroundColor': 'transparent ',
              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.fn.rgba(theme.colors.dark[3], 0.35)
                    : theme.colors.gray[0]
              }
            },
            inner: {
              'justifyContent': 'flex-start',
              'fontWeight': 400,
              'color':
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[0]
                  : theme.black,
              '&:disabled': {
                color:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[3]
                    : theme.colors.gray[5],
                pointerEvents: 'none',
                userSelect: 'none'
              }
            }
          })}
        >
          Site color
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <ColorPicker />
      </Popover.Dropdown>
    </Popover>
  );
};

export default ColorPickerPopover;
