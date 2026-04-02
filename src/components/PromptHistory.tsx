import { Heart, Trash2, Search, Filter, SortDesc, Download, Upload } from 'lucide-react';
import type { SavedPrompt } from '../types/prompt';
import type { Translation } from '../i18n/translations';
import Modal from './ui/Modal';
import { usePromptHistory } from '../hooks/usePromptHistory';
import { exportToJson, exportToMarkdown, exportToText, importFromJson } from '../utils/exportImport';
import { useToast } from '../hooks/useToast';
import { useState, useRef } from 'react';

interface PromptHistoryProps {
  isOpen: boolean;
  savedPrompts: SavedPrompt[];
  isLoading?: boolean;
  onLoad: (prompt: SavedPrompt) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string, currentFavorite: boolean) => void;
  onImport?: (prompts: SavedPrompt[]) => void;
  onClose: () => void;
  t: Translation;
}

export default function PromptHistory({ isOpen, savedPrompts, isLoading = false, onLoad, onDelete, onToggleFavorite, onImport, onClose, t }: PromptHistoryProps) {
  const { addToast } = useToast();
  const {
    searchQuery, setSearchQuery,
    sortBy, setSortBy,
    filterFavorites, setFilterFavorites,
    currentPage, setCurrentPage,
    totalPages, paginatedPrompts
  } = usePromptHistory(savedPrompts);

  const [showExportMenu, setShowExportMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onImport) return;
    try {
      const prompts = await importFromJson(file);
      onImport(prompts);
    } catch {
      addToast('Failed to import: Invalid file format', 'error');
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-4xl" className="max-h-[90vh] overflow-hidden flex flex-col">
      <div id="history-dialog-title" className="flex items-center justify-between mb-4 flex-shrink-0 pt-2 px-2">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{t.savedPrompts.title}</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Upload className="h-4 w-4" />
              <span>Import</span>
            </button>
            <input type="file" accept=".json" className="hidden" ref={fileInputRef} onChange={handleImport} />
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200" onClick={() => { exportToJson(savedPrompts); setShowExportMenu(false); }}>JSON</button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200" onClick={() => { exportToMarkdown(savedPrompts); setShowExportMenu(false); }}>Markdown</button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200" onClick={() => { exportToText(savedPrompts); setShowExportMenu(false); }}>Text</button>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-200"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="mb-4 space-y-3 flex-shrink-0 px-2">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center space-x-2 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 dark:bg-gray-800">
            <SortDesc className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'alphabetical')}
              className="bg-transparent border-none focus:ring-0 text-gray-700 dark:text-gray-200"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
          </div>
          <button
            onClick={() => setFilterFavorites(!filterFavorites)}
            className={`flex items-center space-x-2 border rounded-lg px-3 py-1.5 transition-colors ${
              filterFavorites 
              ? 'border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
              : 'border-gray-200 dark:border-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
            }`}
          >
            <Filter className="h-4 w-4" />
            <span>Favorites Only</span>
          </button>
        </div>
      </div>

      <div className="overflow-y-auto flex-1 px-2 pb-2 space-y-4" role="list" aria-label="Saved prompts">
        {isLoading ? (
          // Skeleton loading state
          <div className="space-y-4" aria-label="Loading saved prompts...">
            {[1, 2, 3].map(i => (
              <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 animate-pulse">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/3"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/4"></div>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-full mb-1"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-4/5 mb-3"></div>
                <div className="flex space-x-2">
                  <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded-lg flex-1"></div>
                  <div className="h-8 w-10 bg-gray-200 dark:bg-gray-600 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        ) : paginatedPrompts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">No matching prompts found.</p>
        ) : (
          paginatedPrompts.map((saved) => (
            <div key={saved.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-700/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onToggleFavorite(saved.id, saved.is_favorite || false)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    aria-label={saved.is_favorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart className={`h-5 w-5 ${saved.is_favorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">{saved.name}</h4>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {saved.timestamp.toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2" title={saved.prompt}>{saved.prompt}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => onLoad(saved)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-sm"
                >
                  {t.buttons.load}
                </button>
                <button
                  onClick={() => onDelete(saved.id)}
                  className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300 text-sm min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label={`Delete prompt: ${saved.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center flex-shrink-0 pt-4 pb-2 border-t border-gray-200 dark:border-gray-700 mt-2 px-2">
          <div className="flex space-x-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 dark:text-white"
            >
              Prev
            </button>
            <span className="px-3 py-1 text-sm flex items-center dark:text-white">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 dark:text-white"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
