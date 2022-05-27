import { Loader } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { PropsWithChildren, useEffect } from 'react';
import { useUser } from '../lib/hooks/userProvider';

const AuthCheck: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { fullyAuthenticated } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!fullyAuthenticated) {
      router.push('/');
    }
  }, [fullyAuthenticated]);

  return fullyAuthenticated === 'loading' ? (
    <Loader variant="bars" />
  ) : fullyAuthenticated ? (
    <>{children}</>
  ) : null;
};

export default AuthCheck;
