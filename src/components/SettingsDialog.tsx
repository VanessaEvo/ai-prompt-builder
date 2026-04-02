import { useState } from 'react';
import { Settings, Key, Cpu } from 'lucide-react';
import type { Translation } from '../i18n/translations';
import { languages } from '../hooks/useTranslation';
import Modal from './ui/Modal';

interface SettingsDialogProps {
  isOpen: boolean;
  activeProvider: string;
  geminiApiKey: string;
  openaiApiKey: string;
  onSaveSettings: (settings: { provider: string; geminiKey: string; openaiKey: string }) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  isDark: boolean;
  onToggleDarkMode: () => void;
  onClose: () => void;
  t: Translation;
}

export default function SettingsDialog({
  isOpen, activeProvider, geminiApiKey, openaiApiKey, onSaveSettings, language, onLanguageChange,
  isDark, onToggleDarkMode, onClose, t
}: SettingsDialogProps) {
  const [editingProvider, setEditingProvider] = useState(activeProvider);
  const [editingGeminiKey, setEditingGeminiKey] = useState(geminiApiKey);
  const [editingOpenaiKey, setEditingOpenaiKey] = useState(openaiApiKey);

  const handleSave = () => {
    onSaveSettings({
      provider: editingProvider,
      geminiKey: editingGeminiKey,
      openaiKey: editingOpenaiKey
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
          <Settings className="h-5 w-5 mr-2 text-gray-600 dark:text-gray-400" />
          {t.settings.title}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
            <Cpu className="h-4 w-4 mr-2" />
            AI Provider
          </label>
          <select
            value={editingProvider}
            onChange={(e) => setEditingProvider(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="gemini">Google Gemini</option>
            <option value="openai">OpenAI ChatGPT</option>
            <option value="local">Local Enhancer (Offline)</option>
          </select>
        </div>

        {editingProvider === 'gemini' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Gemini API Key</label>
            <div className="relative">
              <Key className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={editingGeminiKey}
                onChange={(e) => setEditingGeminiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full pl-10 p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Your API key is stored locally in your browser.
            </p>
          </div>
        )}

        {editingProvider === 'openai' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">OpenAI API Key</label>
            <div className="relative">
              <Key className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={editingOpenaiKey}
                onChange={(e) => setEditingOpenaiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full pl-10 p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Your API key is stored locally in your browser.
            </p>
          </div>
        )}

        {editingProvider === 'local' && (
          <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Local Enhancer works offline and requires no API key. It intelligently appends quality-enhancing keywords to your prompt.
            </p>
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t.settings.language}</label>
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{t.settings.darkMode}</span>
          <button
            onClick={onToggleDarkMode}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              isDark ? 'bg-purple-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                isDark ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            onClick={handleSave}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
          >
            {t.buttons.saveSettings}
          </button>
        </div>
      </div>
    </Modal>
  );
}
