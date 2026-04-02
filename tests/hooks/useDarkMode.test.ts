import { test, expect, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDarkMode } from '../../src/hooks/useDarkMode';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
});

afterEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
});

test('useDarkMode defaults to false when no saved preference', () => {
  const { result } = renderHook(() => useDarkMode());
  expect(result.current.isDark).toBe(false);
  expect(document.documentElement.classList.contains('dark')).toBe(false);
});

test('useDarkMode toggles dark mode and adds/removes class', () => {
  const { result } = renderHook(() => useDarkMode());

  act(() => {
    result.current.toggleDarkMode();
  });

  expect(result.current.isDark).toBe(true);
  expect(document.documentElement.classList.contains('dark')).toBe(true);

  act(() => {
    result.current.toggleDarkMode();
  });

  expect(result.current.isDark).toBe(false);
  expect(document.documentElement.classList.contains('dark')).toBe(false);
});

test('useDarkMode persists preference to localStorage', () => {
  const { result } = renderHook(() => useDarkMode());

  act(() => {
    result.current.toggleDarkMode();
  });

  expect(localStorage.getItem('darkMode')).toBe('true');
});

test('useDarkMode reads persisted preference from localStorage', () => {
  localStorage.setItem('darkMode', 'true');

  const { result } = renderHook(() => useDarkMode());
  expect(result.current.isDark).toBe(true);
});
