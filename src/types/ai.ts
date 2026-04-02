export interface EnhancedPromptResult {
  enhancedPrompt: string;
  error?: string;
}

export interface AIProvider {
  name: string;
  enhance(prompt: string, apiKey: string): Promise<EnhancedPromptResult>;
  isAvailable(): boolean;
}

export type AIProviderType = 'gemini' | 'openai' | 'local';
