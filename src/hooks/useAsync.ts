import { useCallback, useEffect, useRef, useState } from 'react';
import type { AsyncStatus } from '../types';

interface UseAsyncResult<T> {
  data: T | null;
  status: AsyncStatus;
  error: string | null;
  retry: () => void;
}

/**
 * Wraps any async fetcher with idle/loading/success/error state
 * and a retry handle, so screens never need to hand-roll
 * try/catch + isLoading booleans themselves.
 */
export function useAsync<T>(fetcher: () => Promise<T>, deps: unknown[] = []): UseAsyncResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setError(null);

    fetcher()
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setStatus('success');
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message || 'Something went wrong.');
        setStatus('error');
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt]);

  const retry = useCallback(() => setAttempt((a) => a + 1), []);

  return { data, status, error, retry };
}
