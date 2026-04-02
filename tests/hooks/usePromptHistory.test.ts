import { test, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePromptHistory } from '../../src/hooks/usePromptHistory';
import type { SavedPrompt } from '../../src/types/prompt';
import { initialState } from '../../src/utils/constants';

const mockPrompts: SavedPrompt[] = [
  { id: '1', name: 'Zebra', prompt: 'Striped animal', timestamp: new Date('2024-01-01'), state: initialState, is_favorite: false },
  { id: '2', name: 'Apple', prompt: 'Red fruit', timestamp: new Date('2024-01-02'), state: initialState, is_favorite: true },
];

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test('usePromptHistory manages sorting and filtering', () => {
  const { result } = renderHook(() => usePromptHistory(mockPrompts));

  // Default sorting is newest first
  expect(result.current.paginatedPrompts[0].name).toBe('Apple');

  act(() => {
    result.current.setSortBy('oldest');
  });
  expect(result.current.paginatedPrompts[0].name).toBe('Zebra');

  act(() => {
    result.current.setSortBy('alphabetical');
  });
  expect(result.current.paginatedPrompts[0].name).toBe('Apple');

  act(() => {
    result.current.setSearchQuery('fruit');
  });
  act(() => {
    vi.advanceTimersByTime(300);
  });
  expect(result.current.paginatedPrompts.length).toBe(1);
  expect(result.current.paginatedPrompts[0].name).toBe('Apple');
});
