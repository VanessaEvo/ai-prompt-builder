import { AIProvider, EnhancedPromptResult } from '../types/ai';

export class LocalProvider implements AIProvider {
  name = 'Local';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async enhance(originalPrompt: string, _apiKey: string): Promise<EnhancedPromptResult> {
    if (!originalPrompt.trim()) {
      return { enhancedPrompt: originalPrompt };
    }

    // Offline keyword boost
    const qualityTags = [
      'masterpiece', 'best quality', 'highly detailed', 'ultra-detailed',
      '8k resolution', 'cinematic lighting', 'stunning', 'hyperrealistic'
    ];
    
    // Choose 3 random distinct tags
    const shuffled = [...qualityTags].sort(() => 0.5 - Math.random());
    const randomTags = shuffled.slice(0, 3).join(', ');

    return {
      enhancedPrompt: `${originalPrompt}, ${randomTags}`
    };
  }

  isAvailable(): boolean {
    return true;
  }
}
