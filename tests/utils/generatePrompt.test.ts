import { describe, it, expect } from 'vitest';
import { generatePrompt } from '../../src/utils/generatePrompt';
import { initialState } from '../../src/utils/constants';

describe('generatePrompt', () => {
  it('should generate an empty string for initial state', () => {
    expect(generatePrompt(initialState)).toBe('');
  });

  it('should generate a prompt with basic fields', () => {
    const result = generatePrompt({
      ...initialState,
      subject: 'A cute cat',
      style: 'Photorealistic',
      lighting: 'Cinematic lighting'
    });
    expect(result).toBe('A cute cat, Photorealistic, Cinematic lighting');
  });

  it('should handle Midjourney parameters correctly', () => {
    const result = generatePrompt({
      ...initialState,
      subject: 'A cute cat',
      mjVersion: 'v7',
      aspectRatio: '16:9 (Widescreen)',
      seed: '12345',
      tile: true,
      negativePrompt: 'ugly'
    });
    expect(result).toBe('A cute cat --ar 16:9 --no ugly --v 7 --seed 12345 --tile');
  });
});
