import { useEffect, useRef, useCallback } from 'react';

const konamiCodeSequence = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

const MATCH_SEQUENCE = konamiCodeSequence.join('');

export const useKonamiCode = (callback: () => void) => {
  const sequenceRef = useRef<string[]>([]);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { key } = event;
    const next = [...sequenceRef.current, key];

    if (next.length > konamiCodeSequence.length) {
      sequenceRef.current = next.slice(next.length - konamiCodeSequence.length);
    } else {
      sequenceRef.current = next;
    }

    if (sequenceRef.current.join('') === MATCH_SEQUENCE) {
      callbackRef.current();
      sequenceRef.current = [];
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
};
