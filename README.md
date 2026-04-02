# 🎨 AI Prompt Builder Pro

A powerful, modular web application for creating professional AI prompts for image and video generation. Build comprehensive prompts with 6 categories, multi-AI provider enhancement, undo/redo, search/filter history, export/import, and full PWA support.

![AI Prompt Builder](https://drive.usercontent.google.com/download?id=1eePNleZUA_YDJELm-qVqMUMcF9M17DD5)

## ✨ Features

### 🎯 Comprehensive Prompt Building
- **6 Categories**: Subject & Content, Art Style, Lighting & Mood, Camera & Composition, Environment, Effects & Quality
- **Midjourney V7 Parameters**: `--v`, `--seed`, `--sref`, `--iw`, `--tile`, `--no`, `--ar` flags built into the prompt
- **Character Details**: Age, gender, accessories (50+ options), and free-form character text
- **Negative Prompts**: Specify what to exclude from the generated image
- **9 Quick Presets**: Architecture Photography, Food Photography, Product Shot, Landscape/Nature, Abstract Art, 3D Render, Vector Illustration, Cinematic Scene, Street Photography
- **Randomize**: Generate random prompts for instant inspiration

### 🤖 Multi-AI Provider Enhancement
| Provider | Model | API Key Required |
|----------|-------|-----------------|
| Google Gemini | gemini-2.5-flash | Yes (free tier available) |
| OpenAI | gpt-4o | Yes (paid API) |
| Local Enhancer | Offline keyword boost | No |

All three providers share the same full enhancement capability. Switch between them in Settings.

### 💾 History & Export
- **Cloud Sync** via Supabase, falls back to localStorage if unconfigured
- **Search** saved prompts by name or content (300ms debounce)
- **Sort**: Newest, Oldest, Alphabetical
- **Filter**: All or Favorites only
- **Pagination**: 20 prompts per page
- **Favorites**: Star important prompts for quick access
- **Export formats**: JSON (versioned schema), Markdown, Text
- **Import JSON**: Merge exported prompt packs back into your library

### ↩️ Undo / Redo
- **In-memory** history (session only) — no need to persist
- **30 states** maximum
- Smart debounce: select/checkbox changes snapshot instantly; text inputs snapshot on blur or after idle

### 🎨 Design & UX
- **Dark mode** with persistent preference
- **Glassmorphism UI** with animated blob backgrounds
- **Mobile hamburger menu** — sidebar becomes slide-out drawer on `< lg` screens
- **Character count** indicator for prompt length
- **Toast notifications** for copy, save, delete, import, export, and errors
- **Skeleton loading** for history list
- **Lazy-loaded** category forms with `React.lazy` + `Suspense`
- **React.memo** on all category forms to prevent unnecessary re-renders

### ♿ Accessibility
- Skip links: "Skip to main content" & "Skip to preview"
- `role="dialog"` + `aria-modal="true"` on all modals
- Focus trap inside modals (Tab cycles within dialog only)
- `aria-live="polite"` on prompt preview panel
- `aria-current="true"` on active sidebar category
- `aria-label` on all icon-only buttons
- Touch-friendly minimum 44×44px tap targets

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+
- **npm** 9+

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/VanessaEvo/ai-prompt-builder-pro.git
cd ai-prompt-builder-pro

# 2. Install dependencies
npm install

# 3. Set up environment (optional — see below)
cp .env.example .env

# 4. Start dev server
npm run dev
```

Open your browser at `http://localhost:5173`

### Environment Variables

```env
# .env.example

# Supabase (optional — falls back to localStorage if not set)
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

# AI Provider API Keys are stored in localStorage via Settings UI
# They are NOT stored in .env for security (client-side app)
```

> **Security Note:** AI API keys are stored in your browser's localStorage and sent directly to the provider's API. For production with paid keys, consider a backend proxy.

---

## ⚙️ AI Provider Configuration

1. Click the **Settings** button (top right)
2. Select your preferred **AI Provider** from the dropdown
3. Enter the corresponding API key:
   - **Gemini**: Get a free key at [Google AI Studio](https://aistudio.google.com/app/apikey)
   - **OpenAI**: Get your key at [platform.openai.com](https://platform.openai.com/api-keys)
   - **Local**: No key needed — works fully offline
4. Click **Save Settings**

Keys are saved to `localStorage` and never leave your browser (except as the Bearer token sent to the provider's API endpoint).

---

## ⌨️ Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Undo | `Ctrl + Z` |
| Redo | `Ctrl + Y` or `Ctrl + Shift + Z` |
| Copy Prompt | `Ctrl + Shift + C` |
| Save Prompt | `Ctrl + S` / `Cmd + S` |
| Close Modal | `Escape` |
| Navigate Categories | `↑` / `↓` (when not in an input) |

---

## 📱 PWA — Install as App

AI Prompt Builder Pro is a fully installable Progressive Web App.

### Chrome / Edge (Desktop & Android)
1. Open the app in your browser
2. Look for the **Install** button in the address bar (⊕ icon)
3. Click **Install** → the app opens in its own window

### Safari (iOS / macOS)
1. Open the app in Safari
2. Tap the **Share** button
3. Choose **Add to Home Screen**
4. Tap **Add**

The app works **offline** — UI is fully functional without internet. AI enhancement gracefully falls back to the Local provider when offline.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Language | TypeScript 5 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| PWA | vite-plugin-pwa + Workbox |
| Database | Supabase (optional) |
| AI — Gemini | Google Generative AI API |
| AI — OpenAI | OpenAI Chat Completions API |
| Testing | Vitest + Testing Library |

---

## 🧪 Running Tests

```bash
# Run all tests once
npm run test

# Watch mode (during development)
npm run test -- --watch

# With coverage report
npm run test:coverage

# Visual UI
npm run test:ui
```

Test coverage includes:
- `generatePrompt` utility (prompt generation logic)
- `migrateState` utility (backward-compatible state loading)
- `exportImport` utility (JSON/text export)
- `useUndoRedo` hook
- `usePromptHistory` hook (search, sort, filter, pagination)
- `useTranslation` hook
- `useDarkMode` hook
- `aiProvider` factory (Gemini / OpenAI / Local)
- `CategorySidebar` component

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── Modal.tsx               # Reusable modal (focus trap, Escape, role=dialog)
│   │   └── CharacterCount.tsx      # Prompt length indicator
│   ├── category/
│   │   ├── SubjectForm.tsx
│   │   ├── StyleForm.tsx
│   │   ├── LightingForm.tsx
│   │   ├── CameraForm.tsx
│   │   ├── EnvironmentForm.tsx
│   │   ├── EffectsForm.tsx
│   │   └── CategoryFormProps.ts
│   ├── CategorySidebar.tsx
│   ├── PromptPreview.tsx
│   ├── PromptHistory.tsx
│   ├── SaveDialog.tsx
│   ├── SettingsDialog.tsx
│   ├── ErrorBoundary.tsx
│   └── PromptBuilder.tsx           # Orchestrator (~400 lines)
├── services/
│   ├── aiProvider.ts               # Factory pattern
│   ├── gemini.ts
│   ├── openai.ts
│   ├── localEnhancer.ts
│   └── supabase.ts
├── hooks/
│   ├── useDarkMode.ts
│   ├── useTranslation.ts
│   ├── usePromptHistory.ts
│   ├── useUndoRedo.ts
│   └── useToast.tsx
├── types/
│   ├── prompt.ts
│   ├── ai.ts
│   └── index.ts
├── utils/
│   ├── constants.ts
│   ├── generatePrompt.ts
│   ├── exportImport.ts
│   └── migrateState.ts
└── i18n/
    └── translations.ts
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type check |
| `npm run test` | Run all tests |
| `npm run test:coverage` | Run tests with coverage report |

---

## 🤝 Contributing

Contributions are welcome!

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** your changes: `git commit -m 'Add your feature'`
4. **Push** to the branch: `git push origin feature/your-feature`
5. **Open a Pull Request**

Please make sure:
- `npm run lint` passes with 0 errors
- `npm run typecheck` passes with 0 errors
- `npm run test` passes with all tests green

---

## 🐛 Bug Reports

Found a bug? [Open an issue](https://github.com/VanessaEvo/ai-prompt-builder-pro/issues) with:
- Steps to reproduce
- Expected vs actual behavior
- Browser + OS version

---

## 👨‍💻 Author

**ShinX** — [@VanessaEvo](https://github.com/VanessaEvo)

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

<div align="center">

**⭐ Star this repo if you find it helpful! ⭐**

Made with ❤️ by [ShinX](https://github.com/VanessaEvo)

[Report Bug](https://github.com/VanessaEvo/ai-prompt-builder-pro/issues) · [Request Feature](https://github.com/VanessaEvo/ai-prompt-builder-pro/discussions)

</div>
