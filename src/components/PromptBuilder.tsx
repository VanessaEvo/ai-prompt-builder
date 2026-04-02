import { useState, useCallback, useEffect, useMemo, lazy, Suspense } from 'react';
import { Sparkles, Shuffle, History, Settings, Sun, Moon, Undo2, Redo2, Menu, X } from 'lucide-react';
import { createProvider } from '../services/aiProvider';
import { promptService } from '../services/supabase';
import { useDarkMode } from '../hooks/useDarkMode';
import { useTranslation } from '../hooks/useTranslation';
import { useToast } from '../hooks/useToast';
import { useUndoRedo } from '../hooks/useUndoRedo';
import type { PromptState, SavedPrompt } from '../types/prompt';
import type { AIProviderType } from '../types/ai';
import { initialState, categories, options, presetPrompts } from '../utils/constants';
import { generatePrompt } from '../utils/generatePrompt';
import { migratePromptState } from '../utils/migrateState';
import CategorySidebar from './CategorySidebar';
import PromptPreview from './PromptPreview';
import PromptHistoryDialog from './PromptHistory';
import SaveDialog from './SaveDialog';
import SettingsDialog from './SettingsDialog';

const SubjectForm = lazy(() => import('./category/SubjectForm'));
const StyleForm = lazy(() => import('./category/StyleForm'));
const LightingForm = lazy(() => import('./category/LightingForm'));
const CameraForm = lazy(() => import('./category/CameraForm'));
const EnvironmentForm = lazy(() => import('./category/EnvironmentForm'));
const EffectsForm = lazy(() => import('./category/EffectsForm'));

export default function PromptBuilder() {
  const { isDark, toggleDarkMode } = useDarkMode();
  const { t, language, changeLanguage } = useTranslation();
  const { addToast } = useToast();

  const { state: promptState, set: setPromptState, undo, redo, canUndo, canRedo, reset: resetPromptState } = useUndoRedo<PromptState>(initialState);
  
  const [activeCategory, setActiveCategory] = useState('subject');
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [animatePrompt, setAnimatePrompt] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [activeProvider, setActiveProvider] = useState<'gemini' | 'openai' | 'local'>('gemini');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [openaiApiKey, setOpenaiApiKey] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  const generatedPrompt = useMemo(() => generatePrompt(promptState), [promptState]);

  useEffect(() => {
    loadSavedPrompts();
    const savedProvider = localStorage.getItem('ai_provider') as AIProviderType | null;
    if (savedProvider) setActiveProvider(savedProvider);
    const savedGemini = localStorage.getItem('gemini_api_key');
    if (savedGemini) setGeminiApiKey(savedGemini);
    const savedOpenai = localStorage.getItem('openai_api_key');
    if (savedOpenai) setOpenaiApiKey(savedOpenai);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if we are inside an input or textarea
      if (document.activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
         return; // Let inputs handle their own native undo/redo if they are focused
      }

      if (e.ctrlKey && !e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (canUndo) undo();
      }
      if ((e.ctrlKey && e.key.toLowerCase() === 'y') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'z')) {
        e.preventDefault();
        if (canRedo) redo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        setShowSaveDialog(true);
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        navigator.clipboard.writeText(generatedPrompt);
        addToast('Prompt copied to clipboard!', 'success');
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveCategory(prev => {
          const idx = categories.findIndex(c => c.id === prev);
          return idx > 0 ? categories[idx - 1].id : prev;
        });
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveCategory(prev => {
          const idx = categories.findIndex(c => c.id === prev);
          return idx < categories.length - 1 ? categories[idx + 1].id : prev;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, canUndo, canRedo, generatedPrompt, addToast]);

  const loadSavedPrompts = async () => {
    setIsHistoryLoading(true);
    try {
      const prompts = await promptService.getAll();
      const formatted = prompts.map(p => ({
        id: p.id,
        name: p.name,
        prompt: p.prompt,
        timestamp: new Date(p.created_at),
        state: migratePromptState(p.state as Partial<PromptState>),
        is_favorite: p.is_favorite
      }));
      setSavedPrompts(formatted);
    } finally {
      setIsHistoryLoading(false);
    }
  };

  const triggerAnimation = () => {
    setAnimatePrompt(true);
    setTimeout(() => setAnimatePrompt(false), 300);
  };

  const updatePromptState = useCallback((key: keyof PromptState, value: string | string[] | boolean) => {
    setPromptState(prev => ({ ...prev, [key]: value }));
    triggerAnimation();
  }, [setPromptState]);

  const toggleSpecialEffect = useCallback((effect: string) => {
    setPromptState(prev => ({
      ...prev,
      specialEffects: prev.specialEffects.includes(effect)
        ? prev.specialEffects.filter(e => e !== effect)
        : [...prev.specialEffects, effect]
    }));
  }, [setPromptState]);

  const toggleAccessory = useCallback((accessory: string) => {
    setPromptState(prev => ({
      ...prev,
      accessories: prev.accessories.includes(accessory)
        ? prev.accessories.filter(a => a !== accessory)
        : [...prev.accessories, accessory]
    }));
  }, [setPromptState]);

  const handleEnhance = async () => {
    const provider = createProvider(activeProvider);
    let key = '';
    if (activeProvider === 'gemini') key = geminiApiKey;
    if (activeProvider === 'openai') key = openaiApiKey;

    if (activeProvider !== 'local' && !key) { setShowSettings(true); return; }
    if (!promptState.subject.trim()) return;
    setIsEnhancing(true);
    try {
      const result = await provider.enhance(promptState.subject, key);
      if (result.error) {
        addToast(result.error, 'error');
      } else {
        updatePromptState('subject', result.enhancedPrompt);
        addToast('Prompt enhanced!', 'success');
      }
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSavePrompt = async (name: string) => {
    const saved = await promptService.create(name, generatedPrompt, promptState as unknown as Record<string, unknown>);
    if (saved) {
      await loadSavedPrompts();
      addToast('Prompt saved!', 'success');
    }
    setShowSaveDialog(false);
  };

  const handleDeletePrompt = async (id: string) => {
    const success = await promptService.delete(id);
    if (success) {
      await loadSavedPrompts();
      addToast('Prompt deleted', 'info');
    }
  };

  const handleToggleFavorite = async (id: string, currentFavorite: boolean) => {
    const success = await promptService.toggleFavorite(id, !currentFavorite);
    if (success) await loadSavedPrompts();
  };

  const handleImportPrompts = async (prompts: SavedPrompt[]) => {
    let count = 0;
    for (const prompt of prompts) {
      const saved = await promptService.create(prompt.name, prompt.prompt, prompt.state as unknown as Record<string, unknown>);
      if (saved) count++;
    }
    await loadSavedPrompts();
    addToast(`Successfully imported ${count} prompts!`, 'success');
  };

  const handleLoadPrompt = (savedPrompt: SavedPrompt) => {
    setPromptState(savedPrompt.state);
    setShowHistory(false);
    triggerAnimation();
  };

  const handleSaveSettings = (settings: { provider: string; geminiKey: string; openaiKey: string }) => {
    setActiveProvider(settings.provider as AIProviderType);
    setGeminiApiKey(settings.geminiKey);
    setOpenaiApiKey(settings.openaiKey);
    localStorage.setItem('ai_provider', settings.provider);
    localStorage.setItem('gemini_api_key', settings.geminiKey);
    localStorage.setItem('openai_api_key', settings.openaiKey);
    setShowSettings(false);
    addToast('Settings saved!', 'success');
  };

  const resetPrompt = () => {
    resetPromptState(initialState);
    triggerAnimation();
  };

  const loadPreset = (preset: { name: string; state: PromptState }) => {
    setPromptState(preset.state);
    triggerAnimation();
  };

  const randomizePrompt = () => {
    const randomState = { ...initialState };
    Object.keys(options).forEach(key => {
      // Exclude midjourney fields from randomization to not break things too weirdly
      if (['mjVersion', 'seed', 'sref', 'iw', 'tile'].includes(key)) return;

      if (key === 'specialEffects' || key === 'accessories') {
        const items = options[key as keyof typeof options] as string[];
        const randomCount = Math.floor(Math.random() * 3) + 1;
        (randomState as Record<string, unknown>)[key] = items.sort(() => 0.5 - Math.random()).slice(0, randomCount);
      } else {
        const items = options[key as keyof typeof options] as string[];
        if (Math.random() > 0.3 && items) {
          (randomState as Record<string, unknown>)[key] = items[Math.floor(Math.random() * items.length)];
        }
      }
    });
    setPromptState(randomState);
    triggerAnimation();
  };

  const renderCategoryContent = () => {
    const formProps = { promptState, updatePromptState };
    return (
      <div className="min-h-[400px]">
        <Suspense fallback={<div className="flex items-center justify-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div></div>}>
          {activeCategory === 'subject' && <SubjectForm {...formProps} toggleAccessory={toggleAccessory} onEnhance={handleEnhance} isEnhancing={isEnhancing} />}
          {activeCategory === 'style' && <StyleForm {...formProps} />}
          {activeCategory === 'lighting' && <LightingForm {...formProps} />}
          {activeCategory === 'camera' && <CameraForm {...formProps} />}
          {activeCategory === 'environment' && <EnvironmentForm {...formProps} />}
          {activeCategory === 'effects' && <EffectsForm {...formProps} toggleSpecialEffect={toggleSpecialEffect} />}
        </Suspense>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-2">
            <button 
              onClick={undo} 
              disabled={!canUndo}
              className={`p-2 rounded-lg border ${canUndo ? 'bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer' : 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900 text-gray-400 dark:border-gray-800'}`}
              title="Undo (Ctrl+Z)"
              aria-label="Undo"
            >
              <Undo2 className="h-5 w-5" />
            </button>
            <button 
              onClick={redo} 
              disabled={!canRedo}
              className={`p-2 rounded-lg border ${canRedo ? 'bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer' : 'opacity-50 cursor-not-allowed bg-gray-50 dark:bg-gray-900 text-gray-400 dark:border-gray-800'}`}
              title="Redo (Ctrl+Y)"
              aria-label="Redo"
            >
              <Redo2 className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button onClick={() => setShowHistory(true)} className="flex items-center space-x-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm">
              <History className="h-4 w-4" /><span>{t.header.history}</span>
            </button>
            <button onClick={() => setShowSettings(true)} className="flex items-center space-x-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm">
              <Settings className="h-4 w-4" /><span>{t.header.settings}</span>
            </button>
            <button onClick={toggleDarkMode} className="flex items-center space-x-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm" title="Toggle Dark Mode" aria-label="Toggle Dark Mode">
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Sparkles className="h-12 w-12 text-purple-600 mr-3 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              {t.header.title}
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t.header.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button onClick={randomizePrompt} className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold">
              <Shuffle className="h-5 w-5" /><span>{t.header.randomize}</span>
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {presetPrompts.map((preset) => (
              <button key={preset.name} onClick={() => loadPreset(preset)} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-full hover:bg-white dark:hover:bg-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-all shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200">
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:hidden mb-4 flex justify-end">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm text-gray-700 dark:text-gray-200" 
            aria-label="Toggle Category Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span>Menu</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block lg:col-span-1`}>
            <CategorySidebar categories={categories} activeCategory={activeCategory} onCategoryChange={(id) => { setActiveCategory(id); setIsMobileMenuOpen(false); }} t={t} />
          </div>

          <div id="main-content" className="lg:col-span-2">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20 dark:border-gray-700/20">
              <div className="flex items-center mb-8">
                {(() => {
                  const cat = categories.find(c => c.id === activeCategory);
                  const Icon = cat?.icon || Sparkles;
                  return (
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${cat?.color} mr-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  );
                })()}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {categories.find(c => c.id === activeCategory)?.name}
                </h2>
              </div>
              <div className="transition-all duration-500 ease-in-out">
                {renderCategoryContent()}
              </div>
            </div>
          </div>

          <div id="prompt-preview">
            <PromptPreview prompt={generatedPrompt} animatePrompt={animatePrompt} onSave={() => setShowSaveDialog(true)} onReset={resetPrompt} t={t} />
          </div>
        </div>
      </div>

      <SaveDialog isOpen={showSaveDialog} onSave={handleSavePrompt} onClose={() => setShowSaveDialog(false)} t={t} />
      <PromptHistoryDialog isOpen={showHistory} savedPrompts={savedPrompts} isLoading={isHistoryLoading} onLoad={handleLoadPrompt} onDelete={handleDeletePrompt} onToggleFavorite={handleToggleFavorite} onImport={handleImportPrompts} onClose={() => setShowHistory(false)} t={t} />
      <SettingsDialog 
        isOpen={showSettings} 
        activeProvider={activeProvider}
        geminiApiKey={geminiApiKey}
        openaiApiKey={openaiApiKey}
        onSaveSettings={handleSaveSettings} 
        language={language} 
        onLanguageChange={changeLanguage} 
        isDark={isDark} 
        onToggleDarkMode={toggleDarkMode} 
        onClose={() => setShowSettings(false)} 
        t={t} 
      />
    </div>
  );
}