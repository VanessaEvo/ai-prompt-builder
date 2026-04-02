import { memo } from 'react';
import { Map } from 'lucide-react';
import type { CategoryFormProps } from './CategoryFormProps';
import { options } from '../../utils/constants';

export default memo(function EnvironmentForm({ promptState, updatePromptState }: CategoryFormProps) {
  return (
    <div className="space-y-6">
      <div className="transform transition-all duration-300 hover:scale-[1.02]">
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <Map className="h-4 w-4 mr-2 text-indigo-600" />
          Environment/Setting
        </label>
        <select
          value={promptState.environment}
          onChange={(e) => updatePromptState('environment', e.target.value)}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-indigo-50"
        >
          <option value="">Select environment...</option>
          {options.environment.map(env => (
            <option key={env} value={env}>{env}</option>
          ))}
        </select>
      </div>

      <div className="transform transition-all duration-300 hover:scale-[1.02]">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Weather</label>
        <select
          value={promptState.weather}
          onChange={(e) => updatePromptState('weather', e.target.value)}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-indigo-50"
        >
          <option value="">Select weather...</option>
          {options.weather.map(weather => (
            <option key={weather} value={weather}>{weather}</option>
          ))}
        </select>
      </div>
    </div>
  );
})


