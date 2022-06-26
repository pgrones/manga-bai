import throttle from 'lodash.throttle';
import { FC, useEffect, useRef } from 'react';
import { VirtualizedWindowProps } from './virtualizedWindowTypes';

const getScrollPosition = () =>
  window.pageYOffset ||
  document.documentElement.scrollTop ||
  document.body.scrollTop ||
  0;

const VirtualizedWindow: FC<VirtualizedWindowProps> = ({ children }) => {
  const ref = useRef<any>(null);
  const outerRef = useRef<any>(null);

  useEffect(() => {
    const handleWindowScroll = throttle(() => {
      const { offsetTop = 0 } = outerRef.current || {};
      const scrollTop = getScrollPosition() - offsetTop;
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
