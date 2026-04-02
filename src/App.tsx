import PromptBuilder from './components/PromptBuilder';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './hooks/useToast';

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        {/* Skip links — visually hidden, visible on focus for keyboard/screen reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <a
          href="#prompt-preview"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-48 focus:z-[100] focus:px-4 focus:py-2 focus:bg-purple-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
        >
          Skip to preview
        </a>
        <PromptBuilder />
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;