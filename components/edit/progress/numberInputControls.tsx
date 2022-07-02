import { NumberInputHandlers } from '@mantine/core';
import { useMantineTheme } from '@mantine/styles';
import { FC, MutableRefObject } from 'react';
import styles from './numberInputControls.module.css';

const NumberInputControls: FC<{
  handlers: MutableRefObject<NumberInputHandlers | undefined>;
}> = props => {
  const theme = useMantineTheme();

  return (
    <div className={styles['wrapper']}>
      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        className={`${styles['control']} ${styles['control-up']} ${
          theme.colorScheme === 'light' ? styles['control-light'] : undefined
        }`}
        onClick={props.handlers.current?.increment}
      />
      <button
        type="button"
        tabIndex={-1}
        aria-hidden
        className={`${styles['control']} ${styles['control-down']} ${
          theme.colorScheme === 'light' ? styles['control-light'] : undefined
        }`}
        onClick={props.handlers.current?.decrement}
      />
    </div>
  );
};

export default NumberInputControls;
