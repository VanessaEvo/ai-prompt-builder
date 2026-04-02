import { test, expect } from 'vitest';
import { createProvider } from '../../src/services/aiProvider';
import { GeminiProvider } from '../../src/services/gemini';
import { OpenAIProvider } from '../../src/services/openai';
import { LocalProvider } from '../../src/services/localEnhancer';

test('createProvider factory returns correct provider instances', () => {
  const gemini = createProvider('gemini');
  expect(gemini).toBeInstanceOf(GeminiProvider);
  
  const openai = createProvider('openai');
  expect(openai).toBeInstanceOf(OpenAIProvider);
  
  const local = createProvider('local');
  expect(local).toBeInstanceOf(LocalProvider);
});
