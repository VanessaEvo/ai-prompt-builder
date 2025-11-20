import { GoogleGenerativeAI } from '@google/generative-ai';

export interface EnhancedPromptResult {
  enhancedPrompt: string;
  error?: string;
}

export const enhancePrompt = async (
  originalPrompt: string,
  apiKey: string
): Promise<EnhancedPromptResult> => {
  try {
    if (!apiKey) {
      throw new Error('API Key is missing');
    }

    if (!originalPrompt.trim()) {
      return { enhancedPrompt: originalPrompt };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      You are an expert prompt engineer for AI image generation models like Midjourney, Stable Diffusion, and DALL-E.
      Please enhance the following prompt to make it more descriptive, artistic, and detailed while keeping the original intent.
      Return ONLY the enhanced prompt text, without any explanations or quotes.

      Original prompt: "${originalPrompt}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return { enhancedPrompt: text.trim() };
  } catch (error: unknown) {
    console.error('Error enhancing prompt:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return {
      enhancedPrompt: originalPrompt,
      error: errorMessage || 'Failed to enhance prompt'
    };
  }
};
