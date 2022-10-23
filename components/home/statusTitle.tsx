import { Title, useMantineTheme } from '@mantine/core';
import { FC, useEffect, useRef } from 'react';
import { CURRENT, WAITING } from '../../lib/helper/constants';
import { StatusTitleProps } from './statusTitleTypes';

const StatusTitle: FC<StatusTitleProps> = props => {
  const { toolbarRef, setTitle, recalculate } = props;
  const titleRef = useRef<HTMLDivElement>(null);
  const theme = useMantineTheme();

  useEffect(() => {
    if (titleRef.current && toolbarRef.current) {
      const header = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue('--mantine-header-height')
        .replace('px', '');

      // Dimensionen der Liste
      const rootMargin =
        (toolbarRef.current.clientHeight ?? 0) + parseInt(header);

      // Observer erstellen
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Dimensionen der Liste
          const rootTop = entry.rootBounds?.top;
          const rootBottom = entry.rootBounds?.bottom;

          if (!rootTop || !rootBottom) return;

          // Position des Listen Elements
          const topBound = entry.boundingClientRect.top;
          const center =
            entry.boundingClientRect.top + entry.boundingClientRect.height / 2;

          // Das Element ist am oberen Rand, wenn die Mitte der Liste unter dem Element ist
          const top = rootBottom / 2 > topBound;
          // Das Element verschwindet (direction out), wenn
          // der oberere Rand der Liste unter der Mitte des Elements liegt
          const out = rootTop > center;
          // Die Gruppe muss nur aktualisiert werden, wenn das Element am oberen Rand ist
          top && setTitle(out ? CURRENT : WAITING);
        },
        {
          rootMargin: `-${rootMargin}px 0px 0px 0px`,
          threshold: [0.4, 0.6]
        }
      );

      // Observer starten
      observer.observe(titleRef.current);

      return () => observer.disconnect();
    }
  }, [recalculate]);

  return (
    <Title
      ref={titleRef}
      pt="xl"
      order={4}
      color={theme.colorScheme === 'dark' ? 'white' : undefined}
    >
      {CURRENT}
    </Title>
  );
};

export default StatusTitle;
