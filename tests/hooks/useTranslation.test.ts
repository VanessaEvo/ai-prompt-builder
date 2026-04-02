import { test, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTranslation } from '../../src/hooks/useTranslation';

test('useTranslation manages language setting correctly', () => {
  const { result } = renderHook(() => useTranslation());

  // Default is 'en'
  expect(result.current.language).toBe('en');
  expect(result.current.t.header.title).toBe('AI Prompt Builder Pro');

  act(() => {
    // There isn't another language explicitly fully translated in the file 
    // but the functionality should exist to change
    result.current.changeLanguage('es');
  });

  expect(result.current.language).toBe('es');
});
