import { PromptState } from '../types/prompt';

export function generatePrompt(promptState: PromptState): string {
  const parts: string[] = [];

  if (promptState.subject) parts.push(promptState.subject);
  if (promptState.age) parts.push(promptState.age);
  if (promptState.gender) parts.push(promptState.gender);
  if (promptState.characterDetails) parts.push(promptState.characterDetails);
  if (promptState.accessories && promptState.accessories.length > 0) parts.push(`wearing ${promptState.accessories.join(', ')}`);
  if (promptState.style) parts.push(promptState.style);
  if (promptState.artistStyle) parts.push(`in the style of ${promptState.artistStyle}`);
  if (promptState.environment) parts.push(`in ${promptState.environment}`);
  if (promptState.timeOfDay) parts.push(`during ${promptState.timeOfDay}`);
  if (promptState.weather) parts.push(`${promptState.weather} weather`);
  if (promptState.lighting) parts.push(promptState.lighting);
  if (promptState.mood) parts.push(`${promptState.mood} mood`);
  if (promptState.composition) parts.push(promptState.composition);
  if (promptState.camera) parts.push(`shot with ${promptState.camera}`);
  if (promptState.colorPalette) parts.push(promptState.colorPalette);
  if (promptState.specialEffects && promptState.specialEffects.length > 0) parts.push(promptState.specialEffects.join(', '));
  if (promptState.quality) parts.push(promptState.quality);
  if (promptState.additionalDetails) parts.push(promptState.additionalDetails);

  let prompt = parts.filter(Boolean).join(', ');
  
  const mjFlags: string[] = [];

  if (promptState.aspectRatio) {
    mjFlags.push(`--ar ${promptState.aspectRatio.split(' ')[0]}`);
  }

  if (promptState.negativePrompt) {
    mjFlags.push(`--no ${promptState.negativePrompt}`);
  }
  
  if (promptState.mjVersion) {
    mjFlags.push(`--v ${promptState.mjVersion.replace('v', '')}`);
  }
  
  if (promptState.seed) {
    mjFlags.push(`--seed ${promptState.seed}`);
  }
  
  if (promptState.sref) {
    mjFlags.push(`--sref ${promptState.sref}`);
  }
  
  if (promptState.iw) {
    mjFlags.push(`--iw ${promptState.iw}`);
  }
  
  if (promptState.tile) {
    mjFlags.push('--tile');
  }

  if (mjFlags.length > 0) {
    prompt += (prompt ? ' ' : '') + mjFlags.join(' ');
  }

  return prompt;
}
