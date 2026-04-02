import type { PromptState } from '../../types/prompt';

export interface CategoryFormProps {
  promptState: PromptState;
  updatePromptState: (key: keyof PromptState, value: string | string[] | boolean) => void;
}
