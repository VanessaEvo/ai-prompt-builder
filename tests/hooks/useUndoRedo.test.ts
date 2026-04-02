import { test, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useUndoRedo } from '../../src/hooks/useUndoRedo';

test('useUndoRedo manages history state correctly', () => {
  const { result } = renderHook(() => useUndoRedo('initial'));

  expect(result.current.state).toBe('initial');
  expect(result.current.canUndo).toBe(false);
  expect(result.current.canRedo).toBe(false);

  act(() => {
    result.current.set('step1');
  });

  expect(result.current.state).toBe('step1');
  expect(result.current.canUndo).toBe(true);
  expect(result.current.canRedo).toBe(false);

  act(() => {
    result.current.set('step2');
  });

  expect(result.current.state).toBe('step2');

  act(() => {
    result.current.undo();
  });

  expect(result.current.state).toBe('step1');
  expect(result.current.canUndo).toBe(true);
  expect(result.current.canRedo).toBe(true);

  act(() => {
    result.current.undo();
  });

  expect(result.current.state).toBe('initial');
  expect(result.current.canUndo).toBe(false);
  expect(result.current.canRedo).toBe(true);

  act(() => {
    result.current.redo();
  });

  expect(result.current.state).toBe('step1');
});
