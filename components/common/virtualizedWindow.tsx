import throttle from 'lodash.throttle';
import React, { CSSProperties, useEffect, useRef } from 'react';

const windowScrollPositionKey = {
  y: 'pageYOffset',
  x: 'pageXOffset'
};

const documentScrollPositionKey = {
  y: 'scrollTop',
  x: 'scrollLeft'
};

const getScrollPosition = (axis: keyof typeof windowScrollPositionKey) =>
  window[windowScrollPositionKey[axis] as keyof typeof window] ||
  document.documentElement[
    documentScrollPositionKey[axis] as keyof typeof document.documentElement
  ] ||
  document.body[
    documentScrollPositionKey[axis] as keyof typeof document.documentElement
  ] ||
  0;

const VirtualizedWindow: React.FC<{
  children: React.FC<{ ref: any; outerRef: any; style: CSSProperties }>;
}> = ({ children }) => {
  const ref = useRef<any>(null);
  const outerRef = useRef<any>(null);

  useEffect(() => {
    const handleWindowScroll = throttle(() => {
      const { offsetTop = 0 } = outerRef.current || {};
      const scrollTop = getScrollPosition('y') - offsetTop;
      ref.current && ref.current.scrollTo(scrollTop);
    }, 10);

    window.addEventListener('scroll', handleWindowScroll);
    return () => {
      handleWindowScroll.cancel();
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);

  return children({
    ref,
    outerRef,
    style: {
      width: '100%',
      height: '100%'
    }
  });
};

export default VirtualizedWindow;
