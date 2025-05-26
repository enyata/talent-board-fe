'use client';
import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay = 3000) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
