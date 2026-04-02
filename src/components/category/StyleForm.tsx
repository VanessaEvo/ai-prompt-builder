import { memo } from 'react';
import { Palette } from 'lucide-react';
import type { CategoryFormProps } from './CategoryFormProps';
import { options } from '../../utils/constants';

export default memo(function StyleForm({ promptState, updatePromptState }: CategoryFormProps) {
  return (
    <div className="space-y-6">
      <div className="transform transition-all duration-300 hover:scale-[1.02]">
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <Palette className="h-4 w-4 mr-2 text-blue-600" />
          Art Style
        </label>
        <select
          value={promptState.style}
          onChange={(e) => updatePromptState('style', e.target.value)}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-blue-50"
        >
          <option value="">Select a style...</option>
          {options.style.map(style => (
            <option key={style} value={style}>{style}</option>
          ))}
        </select>
      </div>

      <div className="transform transition-all duration-300 hover:scale-[1.02]">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Artist Style Reference</label>
        <select
          value={promptState.artistStyle}
          onChange={(e) => updatePromptState('artistStyle', e.target.value)}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-blue-50"
        >
          <option value="">Select an artist...</option>
          {options.artistStyle.map(artist => (
            <option key={artist} value={artist}>{artist}</option>
          ))}
        </select>
      </div>

      <div className="transform transition-all duration-300 hover:scale-[1.02]">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Color Palette</label>
        <select
          value={promptState.colorPalette}
          onChange={(e) => updatePromptState('colorPalette', e.target.value)}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-blue-50"
        >
          <option value="">Select color palette...</option>
          {options.colorPalette.map(palette => (
            <option key={palette} value={palette}>{palette}</option>
          ))}
        </select>
      </div>
    </div>
  );
})


