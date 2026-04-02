import { describe, it, expect } from 'vitest';
import { migratePromptState } from '../../src/utils/migrateState';
import { initialState } from '../../src/utils/constants';

describe('migrateState', () => {
  it('should merge empty state with initial state', () => {
    expect(migratePromptState({})).toEqual(initialState);
  });

  it('should preserve existing fields', () => {
    const result = migratePromptState({ subject: 'Test' });
    expect(result.subject).toBe('Test');
    expect(result.mjVersion).toBe('');
  });
});
