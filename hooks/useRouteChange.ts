import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export interface RouteChangeState {
  isLoading: boolean;
  error: Error | null;
  targetUrl: string | null;
}

export function useRouteChange(): RouteChangeState {
  const router = useRouter();
  const [state, setState] = useState<RouteChangeState>({
    isLoading: false,
    error: null,
    targetUrl: null,
  });

  useEffect(() => {
    const handleStart = (url: string) =>
      setState({ isLoading: true, error: null, targetUrl: url });

    const handleComplete = () =>
      setState({ isLoading: false, error: null, targetUrl: null });

    const handleError = (err: Error) =>
      setState({ isLoading: false, error: err, targetUrl: null });

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError);
    };
  }, [router.events]);

  return state;
}
