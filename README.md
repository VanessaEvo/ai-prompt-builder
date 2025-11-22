# 🎨 AI Prompt Builder Pro

A powerful, beautiful web application for creating professional AI prompts for image and video generation. Build comprehensive prompts with advanced controls, AI enhancement, presets, and real-time preview.

![AI Prompt Builder](https://drive.usercontent.google.com/download?id=1eePNleZUA_YDJELm-qVqMUMcF9M17DD5)

## ✨ Features

### 🎯 **Comprehensive Prompt Building**
- **Subject & Content**: Define main subjects with character details, age, gender, and accessories
- **Art Styles**: Choose from 25+ art styles including photorealistic, digital art, anime, and classic painting styles
- **Lighting & Mood**: Control lighting conditions (20+ options), mood settings, and time of day
- **Camera & Composition**: Select camera equipment, composition styles, and aspect ratios
- **Environment**: Set locations, weather conditions, and atmospheric elements
- **Effects & Quality**: Add special effects (19+ options) and quality modifiers

### ✨ **AI-Powered Enhancement**
- **Magic Enhance with Gemini**: Automatically enhance your prompts using Google's Gemini AI
- **Smart Prompt Optimization**: Transform simple descriptions into detailed, professional prompts
- **Context-Aware Suggestions**: Get AI-powered improvements while maintaining your original intent

### 🎨 **Advanced Controls**
- **Multi-select Options**: Choose multiple accessories (50+ options) and special effects
- **Negative Prompts**: Specify what to avoid in generated images
- **Aspect Ratio Support**: 11 built-in aspect ratio formats for different platforms
- **Quality Presets**: 15 professional quality settings and trending keywords
- **Artist Style References**: 22 famous artist styles to mimic

### 💾 **Productivity Features**
- **Cloud Sync**: Save unlimited prompts to the cloud with automatic synchronization across devices
- **Favorite Prompts**: Mark your best prompts as favorites for quick access
- **Delete Management**: Remove unwanted prompts with a single click
- **Preset Templates**: 3 quick-start templates for Portrait Photography, Fantasy Art, and Anime Character
- **Export Options**: Copy to clipboard or download as text file
- **Randomize**: Generate random prompts for instant inspiration
- **History Management**: Access and restore previously saved prompts with timestamps
- **Additional Details**: Add custom notes and requirements to any prompt

### 🎭 **Beautiful UI/UX**
- **Modern Design**: Clean, professional interface with gradient backgrounds and smooth animations
- **Real-time Preview**: Live preview panel updates as you make selections
- **Responsive Layout**: Fully responsive design works on desktop, tablet, and mobile
- **Smooth Animations**: Engaging micro-interactions, hover effects, and transitions
- **Category Navigation**: 6 organized categories with color-coded icons for easy navigation
- **Visual Feedback**: Animated blob backgrounds, selection counts, and status indicators

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- (Optional) Google Gemini API key for AI enhancement feature

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VanessaEvo/ai-prompt-builder-pro.git
   cd ai-prompt-builder-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Setting Up AI Enhancement (Optional)

To use the Magic Enhance feature powered by Google Gemini:

1. Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click the "Settings" button in the app
3. Enter your API key
4. Your key is stored locally in your browser and never sent anywhere except to Google's API

## 🛠️ Built With

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with full type coverage
- **Tailwind CSS** - Utility-first CSS framework for beautiful styling
- **Vite** - Lightning-fast build tool and dev server
- **Lucide React** - Beautiful, consistent icon library
- **Google Gemini AI** - Advanced AI model (gemini-2.5-flash) for prompt enhancement
- **Supabase** - Cloud database for prompt storage and synchronization

## 📱 Usage

### Building Your First Prompt

1. **Start with Subject**: Enter your main subject and click the sparkle icon for AI enhancement
2. **Add Character Details**: Select age, gender, and accessories (optional)
3. **Choose Style**: Select an art style and optionally reference a famous artist
4. **Set the Scene**: Pick environment, lighting, mood, and weather
5. **Configure Camera**: Choose composition, camera type, and aspect ratio
6. **Add Effects**: Select special effects and quality settings
7. **Preview & Export**: Watch your prompt build in real-time, then copy, save, or download

### Example Workflow

**Simple Prompt:**
```
Subject: "A majestic dragon"
```

**Click Magic Enhance** (using Gemini AI)
```
Enhanced: "A majestic dragon with iridescent scales reflecting light, powerful wings spread wide, perched atop a craggy mountain peak"
```

**Add Details:**
```
Style: "Digital Art"
Artist Style: "H.R. Giger"
Environment: "Mountain peak"
Time of Day: "Sunset"
Lighting: "Dramatic lighting"
Mood: "Epic"
Weather: "Stormy"
Composition: "Wide shot"
Special Effects: "Volumetric lighting, HDR"
Quality: "Highly detailed, 8K"

Generated Prompt: "A majestic dragon with iridescent scales reflecting light, powerful wings spread wide, perched atop a craggy mountain peak, Digital Art, in the style of H.R. Giger, in Mountain peak, during Sunset, Stormy weather, Dramatic lighting, Epic mood, Wide shot, Volumetric lighting, HDR, Highly detailed, 8K"
```

## 🎯 Use Cases

- **AI Art Generation**: Create detailed prompts for Midjourney, DALL-E, Stable Diffusion, and other AI image generators
- **Content Creation**: Generate ideas for digital artwork, illustrations, and creative projects
- **Creative Writing**: Use as inspiration for character and scene descriptions in stories
- **Education**: Learn about prompt engineering, AI art techniques, and best practices
- **Professional Work**: Create consistent, high-quality prompts for commercial projects and client work
- **Rapid Prototyping**: Quickly experiment with different styles and compositions
- **Art Direction**: Communicate visual ideas to teams or AI tools with precision

## 🎨 Interface Overview

### Main Components

**Category Navigation (Sidebar)**
Six color-coded categories organize every aspect of prompt creation:
- 👥 Subject & Content (Purple gradient)
- 🎨 Art Style (Blue gradient)
- ☀️ Lighting & Mood (Yellow gradient)
- 📷 Camera & Composition (Green gradient)
- 🗺️ Environment (Indigo gradient)
- ✨ Effects & Quality (Pink gradient)

**Live Preview Panel**
- Real-time prompt generation as you make selections
- Animated feedback when changes are made
- Character count and selection indicators
- Quick action buttons: Copy, Save, Export, Reset

**Quick Actions Bar**
- Randomize: Generate random combinations for inspiration
- History: Access all saved prompts
- Settings: Configure Gemini API key
- Preset Templates: Load pre-configured prompt templates

## 🤝 Contributing

Contributions are very welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Ideas for Contributions

- Add more art styles, lighting options, or special effects
- Improve the UI/UX with new animations or layouts
- Add support for other AI services (Claude, GPT-4, etc.)
- Create new preset templates
- Add export formats (JSON, CSV, etc.)
- Implement prompt history search and filtering
- Add dark mode support
- Create browser extension version

## 🐛 Bug Reports & Feature Requests

Found a bug or have an idea?

- **Bug Reports**: [Create an issue](https://github.com/VanessaEvo/ai-prompt-builder-pro/issues) with detailed steps to reproduce
- **Feature Requests**: [Open a discussion](https://github.com/VanessaEvo/ai-prompt-builder-pro/discussions) to suggest new features

## 👨‍💻 Author

**ShinX**
- GitHub: [@VanessaEvo](https://github.com/VanessaEvo)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for providing the powerful AI enhancement capabilities
- **Lucide** for the beautiful and consistent icon set
- **Tailwind CSS** for the amazing utility-first CSS framework
- **React Team** for the incredible framework and developer experience
- **Vite** for the lightning-fast build tool and HMR
- **AI Art Community** for inspiration, feedback, and continuous support
- **All Contributors** who help improve this project

## 🔮 Roadmap

- [ ] Add dark mode theme
- [ ] Implement prompt variations generator
- [ ] Add prompt strength/weight controls
- [ ] Support for video generation prompts
- [ ] Multi-language support
- [x] Cloud sync for saved prompts
- [ ] Community prompt library
- [ ] Advanced prompt templates marketplace
- [ ] Integration with popular AI art platforms

<div align="center">

---

*⭐ This tool is far from perfect so I would like the community to help me improve it ⭐*

**⭐ Star this repo if you find it helpful! ⭐**

Made with ❤️ by [ShinX](https://github.com/VanessaEvo)

[Report Bug](https://github.com/VanessaEvo/ai-prompt-builder-pro/issues) · [Request Feature](https://github.com/VanessaEvo/ai-prompt-builder-pro/discussions) · [Documentation](https://github.com/VanessaEvo/ai-prompt-builder-pro)

</div>
