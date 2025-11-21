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

    const prompt = `
      You are an expert prompt engineer for AI image generation models like Midjourney, Stable Diffusion, and DALL-E.
      Please enhance the following prompt to make it more descriptive, artistic, and detailed while keeping the original intent.
      Return ONLY the enhanced prompt text, without any explanations or quotes.

      Original prompt: "${originalPrompt}"
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('Invalid response format from Gemini API');
    }

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
