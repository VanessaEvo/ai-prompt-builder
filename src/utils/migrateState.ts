import { PromptState } from '../types/prompt';
import { initialState } from './constants';

/**
 * Migrates a partial or outdated PromptState to the current schema.
 * Merges with initialState defaults so any missing fields get default values.
 * Use this when loading saved prompts that may have been created with an older schema.
 */
export function migratePromptState(state: Partial<PromptState>): PromptState {
  return {
    ...initialState,
    ...state,
    // Ensure arrays are always arrays (in case old data has undefined)
    specialEffects: Array.isArray(state.specialEffects) ? state.specialEffects : [],
    accessories: Array.isArray(state.accessories) ? state.accessories : [],
  };
}
