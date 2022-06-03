import '@mantine/core';

declare module '@mantine/core' {
  export interface MantineThemeOther {
    setSiteColor: (value: DefaultMantineColor) => void;
  }
}
