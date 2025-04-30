// src/hooks/useKonamiCode.js
import { useState, useEffect, useCallback } from 'react';

const konamiCodeSequence = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export const useKonamiCode = (callback) => {
  const [keySequence, setKeySequence] = useState([]);

  const handleKeyDown = useCallback((event) => {
    const { key } = event;
    let updatedSequence = [...keySequence, key];

    // Keep sequence length matching Konami code length
    if (updatedSequence.length > konamiCodeSequence.length) {
      updatedSequence = updatedSequence.slice(updatedSequence.length - konamiCodeSequence.length);
    }

    setKeySequence(updatedSequence);

    // Check if sequence matches
    if (updatedSequence.join('') === konamiCodeSequence.join('')) {
      callback(); // Execute the callback function
      setKeySequence([]); // Reset sequence after successful entry
    }
  }, [keySequence, callback]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]); // Depend on the memoized handler

  // Optionally return the current sequence state if needed for debugging
  // return keySequence;
};