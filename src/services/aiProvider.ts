import { AIProvider } from '../types/ai';
import { GeminiProvider } from './gemini';
import { OpenAIProvider } from './openai';
import { LocalProvider } from './localEnhancer';

export function createProvider(type: 'gemini' | 'openai' | 'local'): AIProvider {
  switch (type) {
    case 'gemini': return new GeminiProvider();
    case 'openai': return new OpenAIProvider();
    case 'local': return new LocalProvider();
    default: return new GeminiProvider();
  }
}
