import { MantineNumberSize, MantineSizes, MantineTheme } from '@mantine/core';

const isSizes = (
  radius: (string & {}) | MantineNumberSize
): radius is keyof MantineSizes => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
  return typeof radius === 'string' && sizes.includes(radius);
};

export const getBorderRadius = (theme: MantineTheme) => ({
  borderRadius: isSizes(theme.defaultRadius)
    ? theme.radius[theme.defaultRadius]
    : 'sm'
});
