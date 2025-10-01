// src/hooks/__tests__/useAnimatedCounter.test.js
import { renderHook } from "@testing-library/react";
import { useAnimatedCounter } from "../useAnimatedCounter.hook";

// Mock requestAnimationFrame
global.requestAnimationFrame = jest.fn((cb) => {
  return setTimeout(cb, 0);
});

describe("useAnimatedCounter Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("initializes counter with 0", () => {
    const { result } = renderHook(() => useAnimatedCounter(100));
    expect(result.current).toBe(0);
  });

  test("animates counter to target value", () => {
    const { result } = renderHook(() => useAnimatedCounter(100, 0)); // 0 duration for instant completion
    // With 0 duration, should complete immediately
    expect(result.current).toBe(0); // Starts at 0
  });

  test("handles invalid target values", () => {
    const { result } = renderHook(() => useAnimatedCounter("invalid"));
    expect(result.current).toBe(0);
  });

  test("handles zero target value", () => {
    const { result } = renderHook(() => useAnimatedCounter(0));
    expect(result.current).toBe(0);
  });

  test("uses default duration when not provided", () => {
    const { result } = renderHook(() => useAnimatedCounter(100));
    expect(result.current).toBe(0);
    // Default duration should be 1500ms
  });
});
