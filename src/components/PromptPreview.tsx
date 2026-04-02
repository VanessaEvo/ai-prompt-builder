import { useState } from 'react';
import { Copy, Download, Save, RefreshCw, Eye, Zap } from 'lucide-react';
import type { Translation } from '../i18n/translations';
import CharacterCount from './ui/CharacterCount';
import { downloadAsText } from '../utils/exportImport';

interface PromptPreviewProps {
  prompt: string;
  animatePrompt: boolean;
  onSave: () => void;
  onReset: () => void;
  t: Translation;
}

export default function PromptPreview({ prompt, animatePrompt, onSave, onReset, t }: PromptPreviewProps) {
  const [copiedMessage, setCopiedMessage] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  const handleDownload = () => {
    downloadAsText(prompt, 'ai-prompt.txt');
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sticky top-8 border border-white/20 dark:border-gray-700/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
            <Eye className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
            {t.preview.title}
          </h3>
          <Zap className="h-5 w-5 text-yellow-500 animate-pulse" />
        </div>

        <div className={`bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 mb-6 min-h-[300px] border-2 border-dashed border-gray-200 dark:border-gray-600 transition-all duration-300 ${animatePrompt ? 'scale-105 border-purple-300 dark:border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900' : ''}`}>
          <p aria-live="polite" className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words leading-relaxed">
            {prompt || (
              <span className="text-gray-400 dark:text-gray-500 italic">
                {t.preview.empty}
              </span>
            )}
          </p>
        </div>

        <CharacterCount count={prompt.length} />

        <div className="space-y-3 mt-4">
          <button
            onClick={copyToClipboard}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Copy className="h-4 w-4" />
            <span>{copiedMessage ? '✅ Copied!' : t.buttons.copy}</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onSave}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Save className="h-4 w-4" />
              <span>{t.buttons.save}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Download className="h-4 w-4" />
              <span>{t.buttons.download}</span>
            </button>
          </div>

          <button
            onClick={onReset}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-3 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <RefreshCw className="h-4 w-4" />
            <span>{t.buttons.reset}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
