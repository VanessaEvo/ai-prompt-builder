import { memo } from 'react';
import { Star, Wand2 } from 'lucide-react';
import type { CategoryFormProps } from './CategoryFormProps';
import { options } from '../../utils/constants';

interface EffectsFormProps extends CategoryFormProps {
  toggleSpecialEffect: (effect: string) => void;
}

export default memo(function EffectsForm({ promptState, updatePromptState, toggleSpecialEffect }: EffectsFormProps) {
  return (
    <div className="space-y-6">
      <div className="transform transition-all duration-300 hover:scale-[1.02]">
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <Star className="h-4 w-4 mr-2 text-pink-600" />
          Quality Settings
        </label>
        <select
          value={promptState.quality}
          onChange={(e) => updatePromptState('quality', e.target.value)}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-pink-50"
        >
          <option value="">Select quality...</option>
          {options.quality.map(quality => (
            <option key={quality} value={quality}>{quality}</option>
          ))}
        </select>
      </div>

      <div className="transform transition-all duration-300 hover:scale-[1.02]">
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center justify-between">
          <span className="flex items-center">
            <Wand2 className="h-4 w-4 mr-2 text-pink-600" />
            Special Effects
          </span>
          <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
            {promptState.specialEffects.length} selected
          </span>
        </label>
        <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto border-2 border-gray-200 rounded-xl p-4 bg-gradient-to-br from-white to-pink-50">
          {options.specialEffects.map(effect => (
            <label key={effect} className="flex items-center space-x-2 cursor-pointer hover:bg-pink-100 p-2 rounded-lg transition-all duration-200 group">
              <input
                type="checkbox"
                checked={promptState.specialEffects.includes(effect)}
                onChange={() => toggleSpecialEffect(effect)}
                className="rounded border-gray-300 text-pink-600 focus:ring-pink-500 transition-all duration-200"
              />
              <span className="text-sm text-gray-700 group-hover:text-pink-700 transition-colors duration-200">{effect}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="transform transition-all duration-300 hover:scale-[1.02]">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Negative Prompt (What to avoid)</label>
        <textarea
          value={promptState.negativePrompt}
          onChange={(e) => updatePromptState('negativePrompt', e.target.value)}
          placeholder="Things to avoid in the image (e.g., 'blurry, low quality, distorted')"
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-pink-50"
          rows={2}
        />
      </div>

      <div className="transform transition-all duration-300 hover:scale-[1.02]">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Additional Details</label>
        <textarea
          value={promptState.additionalDetails}
          onChange={(e) => updatePromptState('additionalDetails', e.target.value)}
          placeholder="Any additional details or specific requirements"
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-pink-50"
          rows={2}
        />
      </div>

      <div className="bg-gray-50/50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 mt-8 space-y-4">
        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
          Midjourney Parameters
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Version</label>
            <select
              value={promptState.mjVersion}
              onChange={(e) => updatePromptState('mjVersion', e.target.value)}
              className="w-full p-2 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="">Default</option>
              {options.mjVersion?.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Seed</label>
            <input
              type="text"
              value={promptState.seed}
              onChange={(e) => updatePromptState('seed', e.target.value)}
              placeholder="e.g. 12345"
              className="w-full p-2 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Style Reference (--sref)</label>
            <input
              type="text"
              value={promptState.sref}
              onChange={(e) => updatePromptState('sref', e.target.value)}
              placeholder="URL"
              className="w-full p-2 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Image Weight (--iw 0-2)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="2"
              value={promptState.iw}
              onChange={(e) => updatePromptState('iw', e.target.value)}
              className="w-full p-2 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
          <div className="md:col-span-2 flex items-center mt-2">
            <input
              type="checkbox"
              checked={promptState.tile}
              onChange={(e) => updatePromptState('tile', e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600 text-pink-600 focus:ring-pink-500 mr-2 dark:bg-gray-800"
              id="tile-checkbox"
            />
            <label htmlFor="tile-checkbox" className="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">Tileable pattern (--tile)</label>
          </div>
        </div>
      </div>
    </div>
  );
})


