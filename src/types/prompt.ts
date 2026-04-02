export interface PromptState {
  subject: string;
  style: string;
  lighting: string;
  composition: string;
  colorPalette: string;
  mood: string;
  camera: string;
  artistStyle: string;
  environment: string;
  timeOfDay: string;
  weather: string;
  aspectRatio: string;
  quality: string;
  negativePrompt: string;
  specialEffects: string[];
  characterDetails: string;
  age: string;
  gender: string;
  accessories: string[];
  additionalDetails: string;
  // Midjourney V7 fields
  mjVersion: string;
  seed: string;
  sref: string;
  iw: string;
  tile: boolean;
}

export interface SavedPrompt {
  id: string;
  name: string;
  prompt: string;
  timestamp: Date;
  state: PromptState;
  is_favorite?: boolean;
}
