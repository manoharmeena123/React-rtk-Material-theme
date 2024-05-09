import { useCallback, useEffect } from 'react';

import type { AuthContextType } from 'src/contexts/auth/auth0-context';
import { useAuth } from 'src/hooks/use-auth';
import { paths } from 'src/paths';

const Page = () => {
  const { loginWithRedirect } = useAuth<AuthContextType>();

  const handle = useCallback(
    async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const returnTo = searchParams.get('returnTo');
      await loginWithRedirect({
        returnTo: returnTo || paths.dashboard.index
      });
    },
    [loginWithRedirect]
  );

  useEffect(
    () => {
      handle();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return null;
};

export default Page;
