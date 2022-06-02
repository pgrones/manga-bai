import { useRouter } from 'next/router';
import React, { PropsWithChildren, useEffect } from 'react';
import { useUser } from '../../lib/hooks/userProvider';
import LoadingIndicator from './loadingIndicator';

const AuthCheck: React.FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { fullyAuthenticated } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (fullyAuthenticated === false) {
      router.push('/');
    }
  }, [fullyAuthenticated]);

  return fullyAuthenticated === 'loading' ? (
    <LoadingIndicator />
  ) : fullyAuthenticated ? (
    <>{children}</>
  ) : null;
};

export default AuthCheck;
