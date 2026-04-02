import { useState } from 'react';
import type { Translation } from '../i18n/translations';
import Modal from './ui/Modal';

interface SaveDialogProps {
  isOpen: boolean;
  onSave: (name: string) => void;
  onClose: () => void;
  t: Translation;
}

export default function SaveDialog({ isOpen, onSave, onClose, t }: SaveDialogProps) {
  const [promptName, setPromptName] = useState('');

  const handleSave = () => {
    if (!promptName.trim()) return;
    onSave(promptName);
    setPromptName('');
  };

  const handleClose = () => {
    setPromptName('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t.savedPrompts.saveDialogTitle}</h3>
      <input
        type="text"
        value={promptName}
        onChange={(e) => setPromptName(e.target.value)}
        placeholder={t.savedPrompts.promptNamePlaceholder}
        className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-6 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        autoFocus
        onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); }}
      />
      <div className="flex space-x-3">
        <button
          onClick={handleSave}
          disabled={!promptName.trim()}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t.buttons.save}
        </button>
        <button
          onClick={handleClose}
          className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
        >
          {t.buttons.cancel}
        </button>
      </div>
    </Modal>
  );
}
