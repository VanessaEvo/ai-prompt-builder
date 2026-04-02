import { memo } from 'react';
import { Sun } from 'lucide-react';
import type { CategoryFormProps } from './CategoryFormProps';
import { options } from '../../utils/constants';

export default memo(function LightingForm({ promptState, updatePromptState }: CategoryFormProps) {
  return (
    <div className="space-y-6">
      <div className="transform transition-all duration-300 hover:scale-[1.02]">
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <Sun className="h-4 w-4 mr-2 text-yellow-600" />
          Lighting
        </label>
        <select
          value={promptState.lighting}
          onChange={(e) => updatePromptState('lighting', e.target.value)}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-yellow-50"
        >
          <option value="">Select lighting...</option>
          {options.lighting.map(lighting => (
            <option key={lighting} value={lighting}>{lighting}</option>
          ))}
        </select>
      </div>

      <div className="transform transition-all duration-300 hover:scale-[1.02]">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Mood</label>
        <select
          value={promptState.mood}
          onChange={(e) => updatePromptState('mood', e.target.value)}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-yellow-50"
        >
          <option value="">Select mood...</option>
          {options.mood.map(mood => (
            <option key={mood} value={mood}>{mood}</option>
          ))}
        </select>
      </div>

      <div className="transform transition-all duration-300 hover:scale-[1.02]">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Time of Day</label>
        <select
          value={promptState.timeOfDay}
          onChange={(e) => updatePromptState('timeOfDay', e.target.value)}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-yellow-50"
        >
          <option value="">Select time...</option>
          {options.timeOfDay.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>
    </div>
  );
})


