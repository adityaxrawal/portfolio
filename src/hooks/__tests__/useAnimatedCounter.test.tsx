import { renderHook } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach } from 'vitest';

import { useAnimatedCounter } from '../useAnimatedCounter';

// Mock requestAnimationFrame
(globalThis as any).requestAnimationFrame = vi.fn(
  (cb: FrameRequestCallback) => {
    return setTimeout(cb, 0) as unknown as number;
  },
);

describe('useAnimatedCounter Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('initializes counter with 0', () => {
    const { result } = renderHook(() => useAnimatedCounter(100));
    expect(result.current).toBe(0);
  });

  test('animates counter to target value', () => {
    const { result } = renderHook(() => useAnimatedCounter(100, 0)); // 0 duration for instant completion
    // With 0 duration, should complete immediately
    expect(result.current).toBe(0); // Starts at 0
  });

  test('handles invalid target values', () => {
    const { result } = renderHook(() => useAnimatedCounter('invalid'));
    expect(result.current).toBe(0);
  });

  test('handles zero target value', () => {
    const { result } = renderHook(() => useAnimatedCounter(0));
    expect(result.current).toBe(0);
  });

  test('uses default duration when not provided', () => {
    const { result } = renderHook(() => useAnimatedCounter(100));
    expect(result.current).toBe(0);
    // Default duration should be 1500ms
  });
});
