import { memo } from 'react';
import { Camera } from 'lucide-react';
import type { CategoryFormProps } from './CategoryFormProps';
import { options } from '../../utils/constants';

export default memo(function CameraForm({ promptState, updatePromptState }: CategoryFormProps) {
  return (
    <div className="space-y-6">
      <div className="transform transition-all duration-300 hover:scale-[1.02]">
        <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <Camera className="h-4 w-4 mr-2 text-green-600" />
          Camera/Equipment
        </label>
        <select
          value={promptState.camera}
          onChange={(e) => updatePromptState('camera', e.target.value)}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-green-50"
        >
          <option value="">Select camera...</option>
          {options.camera.map(camera => (
            <option key={camera} value={camera}>{camera}</option>
          ))}
        </select>
      </div>

      <div className="transform transition-all duration-300 hover:scale-[1.02]">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Composition</label>
        <select
          value={promptState.composition}
          onChange={(e) => updatePromptState('composition', e.target.value)}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-green-50"
        >
          <option value="">Select composition...</option>
          {options.composition.map(comp => (
            <option key={comp} value={comp}>{comp}</option>
          ))}
        </select>
      </div>

      <div className="transform transition-all duration-300 hover:scale-[1.02]">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Aspect Ratio</label>
        <select
          value={promptState.aspectRatio}
          onChange={(e) => updatePromptState('aspectRatio', e.target.value)}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-green-50"
        >
          <option value="">Select aspect ratio...</option>
          {options.aspectRatio.map(ratio => (
            <option key={ratio} value={ratio}>{ratio}</option>
          ))}
        </select>
      </div>
    </div>
  );
})


