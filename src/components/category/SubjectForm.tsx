import { memo } from 'react';
import { Users, Sparkles } from 'lucide-react';
import type { CategoryFormProps } from './CategoryFormProps';
import { options } from '../../utils/constants';

interface SubjectFormProps extends CategoryFormProps {
  toggleAccessory: (accessory: string) => void;
  onEnhance: () => void;
  isEnhancing: boolean;
}

export default memo(function SubjectForm({ promptState, updatePromptState, toggleAccessory, onEnhance, isEnhancing }: SubjectFormProps) {
  return (
    <div className="space-y-6">
      <div className="transform transition-all duration-300 hover:scale-[1.02]">
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <Users className="h-4 w-4 mr-2 text-purple-600" />
          Main Subject
        </label>
        <div className="relative">
          <textarea
            value={promptState.subject}
            onChange={(e) => updatePromptState('subject', e.target.value)}
            placeholder="Describe the main subject (e.g., 'A majestic lion', 'A futuristic robot', 'A beautiful woman')"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-gray-50 pr-14"
            rows={3}
          />
          <button
            onClick={onEnhance}
            disabled={isEnhancing || !promptState.subject.trim()}
            className={`absolute bottom-3 right-3 p-2 rounded-lg transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center ${
              isEnhancing
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-md transform hover:scale-105'
            }`}
            title={isEnhancing ? 'Enhancing...' : 'Magic Enhance with AI'}
            aria-label={isEnhancing ? 'Enhancing prompt...' : 'Enhance prompt with AI'}
          >
            <Sparkles className={`h-5 w-5 ${isEnhancing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="transform transition-all duration-300 hover:scale-[1.02]">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Age Range</label>
          <select
            value={promptState.age}
            onChange={(e) => updatePromptState('age', e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-gray-50"
          >
            <option value="">Select age range...</option>
            {options.age.map(age => (
              <option key={age} value={age}>{age}</option>
            ))}
          </select>
        </div>

        <div className="transform transition-all duration-300 hover:scale-[1.02]">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Gender</label>
          <select
            value={promptState.gender}
            onChange={(e) => updatePromptState('gender', e.target.value)}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-gray-50"
          >
            <option value="">Select gender...</option>
            {options.gender.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="transform transition-all duration-300 hover:scale-[1.02]">
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center justify-between">
          <span className="flex items-center">
            <Sparkles className="h-4 w-4 mr-2 text-purple-600" />
            Accessories
          </span>
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
            {promptState.accessories.length} selected
          </span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto border-2 border-gray-200 rounded-xl p-4 bg-gradient-to-br from-white to-gray-50">
          {options.accessories.map(accessory => (
            <label key={accessory} className="flex items-center space-x-2 cursor-pointer hover:bg-purple-50 p-2 rounded-lg transition-all duration-200 group">
              <input
                type="checkbox"
                checked={promptState.accessories.includes(accessory)}
                onChange={() => toggleAccessory(accessory)}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 transition-all duration-200"
              />
              <span className="text-sm text-gray-700 group-hover:text-purple-700 transition-colors duration-200">{accessory}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="transform transition-all duration-300 hover:scale-[1.02]">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Character Details</label>
        <textarea
          value={promptState.characterDetails}
          onChange={(e) => updatePromptState('characterDetails', e.target.value)}
          placeholder="Additional character details (clothing, expression, pose, hair color, etc.)"
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-gray-50"
          rows={2}
        />
      </div>
    </div>
  );
})


