import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  startNavigationProgress,
  resetNavigationProgress,
  NavigationProgress,
  setNavigationProgress
} from '@mantine/nprogress';

const RouterTransition = () => {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: string) => {
      url !== router.asPath && startNavigationProgress();
    };
    const handleComplete = () => {
      // Event fires too fast -> bit of a timeout
      setTimeout(() => {
        setNavigationProgress(100);
        setTimeout(() => resetNavigationProgress(), 400);
      }, 50);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.asPath]);

  return <NavigationProgress />;
};

export default RouterTransition;
