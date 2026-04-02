import { AIProvider, EnhancedPromptResult } from '../types/ai';

export class OpenAIProvider implements AIProvider {
  name = 'OpenAI';

  async enhance(originalPrompt: string, apiKey: string): Promise<EnhancedPromptResult> {
    try {
      if (!apiKey) {
        throw new Error('OpenAI API Key is missing');
      }

      if (!originalPrompt.trim()) {
        return { enhancedPrompt: originalPrompt };
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'You are an expert prompt engineer for AI image generation models. Enhance the following prompt to make it more descriptive, artistic, and detailed while keeping the original intent. Return ONLY the enhanced prompt text, without any explanations or quotes.'
            },
            {
              role: 'user',
              content: `Original prompt: "${originalPrompt}"`
            }
          ]
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content;

      if (!text) {
        throw new Error('Invalid response format from OpenAI API');
      }

      return { enhancedPrompt: text.trim() };
    } catch (error: unknown) {
      console.error('Error enhancing prompt with OpenAI:', error);
      return {
        enhancedPrompt: originalPrompt,
        error: error instanceof Error ? error.message : 'Failed to enhance prompt'
      };
    }
  }

  isAvailable(): boolean {
    return true;
  }
}
