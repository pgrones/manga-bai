import '@mantine/core';
import { MantineTheme } from '@mantine/core';

declare module '@mantine/core' {
  export interface MantineThemeOther {
    setSiteColor: (value: DefaultMantineColor) => void;
    getThemeBg: (theme: MantineTheme) => string;
  }
}
