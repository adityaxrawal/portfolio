import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, test, expect, beforeEach } from 'vitest';

import { AppProvider, useSharedState } from '../AppContext';

import { darkModeColorList, lightModeColorList } from '@/config';

describe('AppContext theme initialization', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <AppProvider>{children}</AppProvider>
  );

  test('defaults to dark theme when no localStorage theme exists', () => {
    const { result } = renderHook(() => useSharedState(), { wrapper });

    expect(result.current.isDarkTheme).toBe(true);
    expect(result.current.backgroundColor).toBe(darkModeColorList[0]);
  });

  test('respects explicit "light" theme preference from localStorage', () => {
    localStorage.setItem('theme', 'light');

    const { result } = renderHook(() => useSharedState(), { wrapper });

    expect(result.current.isDarkTheme).toBe(false);
    expect(result.current.backgroundColor).toBe(lightModeColorList[0]);
  });

  test('respects explicit "dark" theme preference from localStorage', () => {
    localStorage.setItem('theme', 'dark');

    const { result } = renderHook(() => useSharedState(), { wrapper });

    expect(result.current.isDarkTheme).toBe(true);
    expect(result.current.backgroundColor).toBe(darkModeColorList[0]);
  });

  test('allows toggling dark theme state', () => {
    const { result } = renderHook(() => useSharedState(), { wrapper });

    expect(result.current.isDarkTheme).toBe(true);

    act(() => {
      result.current.setDarkTheme(false);
      result.current.setBackgroundColor(lightModeColorList[0]);
    });

    expect(result.current.isDarkTheme).toBe(false);
    expect(result.current.backgroundColor).toBe(lightModeColorList[0]);
  });
});
