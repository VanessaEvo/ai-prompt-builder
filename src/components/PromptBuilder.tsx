import React, { useState, useCallback, useEffect } from 'react';
import { Copy, Download, RefreshCw, Sparkles, Camera, Palette, Sun, Users, Map, Wand2, ChevronRight, Star, Zap, Eye, Settings, Save, Share2, History, Shuffle, Heart, Github } from 'lucide-react';

interface PromptState {
  subject: string;
  style: string;
  lighting: string;
  composition: string;
  colorPalette: string;
  mood: string;
  camera: string;
  artistStyle: string;
  environment: string;
  timeOfDay: string;
  weather: string;
  aspectRatio: string;
  quality: string;
  negativePrompt: string;
  specialEffects: string[];
  characterDetails: string;
  age: string;
  gender: string;
  accessories: string[];
  additionalDetails: string;
}

interface SavedPrompt {
  id: string;
  name: string;
  prompt: string;
  timestamp: Date;
  state: PromptState;
}

const initialState: PromptState = {
  subject: '',
  style: '',
  lighting: '',
  composition: '',
  colorPalette: '',
  mood: '',
  camera: '',
  artistStyle: '',
  environment: '',
  timeOfDay: '',
  weather: '',
  aspectRatio: '',
  quality: '',
  negativePrompt: '',
  specialEffects: [],
  characterDetails: '',
  age: '',
  gender: '',
  accessories: [],
  additionalDetails: ''
};

const categories = [
  { id: 'subject', name: 'Subject & Content', icon: Users, color: 'from-purple-500 to-pink-500' },
  { id: 'style', name: 'Art Style', icon: Palette, color: 'from-blue-500 to-cyan-500' },
  { id: 'lighting', name: 'Lighting & Mood', icon: Sun, color: 'from-yellow-500 to-orange-500' },
  { id: 'camera', name: 'Camera & Composition', icon: Camera, color: 'from-green-500 to-emerald-500' },
  { id: 'environment', name: 'Environment', icon: Map, color: 'from-indigo-500 to-purple-500' },
  { id: 'effects', name: 'Effects & Quality', icon: Wand2, color: 'from-pink-500 to-rose-500' }
];

const options = {
  style: [
    'Photorealistic', 'Digital Art', 'Oil Painting', 'Watercolor', 'Pencil Sketch',
    'Anime/Manga', 'Cartoon', 'Pop Art', 'Impressionist', 'Surrealist',
    'Cyberpunk', 'Steampunk', 'Art Nouveau', 'Bauhaus', 'Minimalist',
    'Hyperrealistic', '3D Render', 'Pixel Art', 'Vector Art', 'Low Poly',
    'Renaissance', 'Baroque', 'Gothic', 'Art Deco', 'Graffiti'
  ],
  lighting: [
    'Natural lighting', 'Golden hour', 'Blue hour', 'Dramatic lighting',
    'Soft diffused light', 'Hard lighting', 'Rim lighting', 'Backlighting',
    'Volumetric lighting', 'Neon lighting', 'Candlelight', 'Studio lighting',
    'Cinematic lighting', 'High contrast', 'Low key lighting', 'High key lighting',
    'Chiaroscuro', 'God rays', 'Moonlight', 'Firelight'
  ],
  composition: [
    'Close-up', 'Medium shot', 'Wide shot', 'Extreme close-up', 'Bird\'s eye view',
    'Worm\'s eye view', 'Dutch angle', 'Rule of thirds', 'Centered composition',
    'Symmetrical', 'Asymmetrical', 'Leading lines', 'Framing', 'Depth of field',
    'Panoramic', 'Portrait orientation', 'Landscape orientation', 'Square format'
  ],
  colorPalette: [
    'Vibrant colors', 'Muted colors', 'Monochromatic', 'Complementary colors',
    'Analogous colors', 'Warm palette', 'Cool palette', 'Pastel colors',
    'High saturation', 'Desaturated', 'Black and white', 'Sepia tone',
    'Neon colors', 'Earth tones', 'Jewel tones', 'Metallic colors',
    'Gradient colors', 'Duotone', 'Triadic colors'
  ],
  mood: [
    'Peaceful', 'Energetic', 'Mysterious', 'Romantic', 'Dramatic',
    'Melancholic', 'Joyful', 'Tense', 'Serene', 'Epic',
    'Whimsical', 'Dark', 'Bright', 'Nostalgic', 'Futuristic',
    'Ethereal', 'Intense', 'Calm', 'Chaotic', 'Majestic'
  ],
  camera: [
    'DSLR', 'Film camera', 'Polaroid', 'iPhone photography', 'GoPro',
    'Drone shot', 'Security camera', 'Vintage camera', 'Medium format',
    'Large format', 'Fisheye lens', 'Macro lens', 'Telephoto lens',
    'Wide angle lens', 'Prime lens', '35mm film', 'Instant camera',
    'Pinhole camera', 'Disposable camera'
  ],
  artistStyle: [
    'Van Gogh', 'Picasso', 'Da Vinci', 'Monet', 'Dali',
    'Banksy', 'Warhol', 'Hokusai', 'Basquiat', 'Pollock',
    'Studio Ghibli', 'Tim Burton', 'H.R. Giger', 'Alphonse Mucha',
    'Norman Rockwell', 'Greg Rutkowski', 'Artgerm', 'Ross Tran',
    'Caravaggio', 'Frida Kahlo', 'Georgia O\'Keeffe', 'Kandinsky'
  ],
  environment: [
    'Forest', 'Beach', 'Mountain', 'City', 'Desert',
    'Space', 'Underwater', 'Indoor studio', 'Cafe', 'Library',
    'Futuristic city', 'Medieval castle', 'Tropical island', 'Arctic landscape',
    'Alien planet', 'Post-apocalyptic', 'Cyberpunk city', 'Fantasy realm',
    'Ancient ruins', 'Modern office', 'Art gallery', 'Concert hall'
  ],
  timeOfDay: [
    'Sunrise', 'Morning', 'Noon', 'Afternoon', 'Sunset',
    'Dusk', 'Night', 'Midnight', 'Dawn', 'Late evening',
    'Magic hour', 'Twilight', 'Pre-dawn', 'High noon'
  ],
  weather: [
    'Clear sky', 'Cloudy', 'Rainy', 'Stormy', 'Snowy',
    'Foggy', 'Misty', 'Windy', 'Overcast', 'Sunny',
    'Thunderstorm', 'Drizzle', 'Hail', 'Rainbow', 'Aurora'
  ],
  aspectRatio: [
    '1:1 (Square)', '4:3 (Standard)', '16:9 (Widescreen)', '3:2 (Photography)',
    '9:16 (Vertical)', '21:9 (Ultrawide)', '5:4 (Portrait)', '2:3 (Book)',
    '4:5 (Instagram)', '16:10 (Monitor)', '2.35:1 (Cinematic)'
  ],
  quality: [
    '4K', '8K', 'Ultra HD', 'High resolution', 'Professional quality',
    'Award winning', 'Trending on ArtStation', 'Highly detailed',
    'Masterpiece', 'Best quality', 'Ultra realistic', 'Photographic',
    'Studio quality', 'Gallery worthy', 'Museum quality'
  ],
  specialEffects: [
    'Bokeh', 'Lens flare', 'Motion blur', 'Depth of field', 'Vignette',
    'Film grain', 'Chromatic aberration', 'Glowing effects', 'Particle effects',
    'Double exposure', 'Long exposure', 'HDR', 'Tilt-shift', 'Cross processing',
    'Light leaks', 'Prism effects', 'Holographic', 'Iridescent', 'Reflections'
  ],
  age: [
    'Baby (0-2 years)', 'Toddler (2-4 years)', 'Child (5-12 years)', 
    'Teenager (13-19 years)', 'Young adult (20-29 years)', 'Adult (30-39 years)',
    'Middle-aged (40-59 years)', 'Senior (60-79 years)', 'Elderly (80+ years)',
    'Ageless', 'Ancient', 'Timeless'
  ],
  gender: [
    'Male', 'Female', 'Non-binary', 'Androgynous', 'Gender-neutral'
  ],
  accessories: [
    'Glasses', 'Sunglasses', 'Reading glasses', 'Safety glasses', 'Goggles',
    'Hat', 'Cap', 'Beanie', 'Fedora', 'Helmet', 'Crown', 'Headband',
    'Earrings', 'Necklace', 'Bracelet', 'Ring', 'Watch', 'Pendant',
    'Scarf', 'Tie', 'Bow tie', 'Belt', 'Suspenders', 'Gloves', 'Mittens',
    'Backpack', 'Handbag', 'Briefcase', 'Purse', 'Satchel', 'Messenger bag',
    'Mask', 'Face mask', 'Bandana', 'Eyepatch', 'Monocle',
    'Headphones', 'Earbuds', 'Hearing aid', 'Bluetooth device',
    'Walking stick', 'Cane', 'Umbrella', 'Fan', 'Flower in hair',
    'Hair clip', 'Hair tie', 'Ribbon', 'Bow', 'Pins', 'Brooch'
  ]
};

const presetPrompts = [
  {
    name: 'Portrait Photography',
    state: {
      ...initialState,
      subject: 'Professional headshot',
      style: 'Photorealistic',
      lighting: 'Studio lighting',
      composition: 'Medium shot',
      camera: 'DSLR',
      quality: 'Professional quality'
    }
  },
  {
    name: 'Fantasy Art',
    state: {
      ...initialState,
      subject: 'Mystical warrior',
      style: 'Digital Art',
      lighting: 'Dramatic lighting',
      environment: 'Fantasy realm',
      mood: 'Epic',
      quality: 'Highly detailed'
    }
  },
  {
    name: 'Anime Character',
    state: {
      ...initialState,
      subject: 'Anime character',
      style: 'Anime/Manga',
      lighting: 'Soft diffused light',
      colorPalette: 'Vibrant colors',
      mood: 'Joyful',
      quality: 'Best quality'
    }
  }
];

export default function PromptBuilder() {
  const [promptState, setPromptState] = useState<PromptState>(initialState);
  const [activeCategory, setActiveCategory] = useState('subject');
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [savePromptName, setSavePromptName] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [animatePrompt, setAnimatePrompt] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aiPromptBuilder_savedPrompts');
    if (saved) {
      setSavedPrompts(JSON.parse(saved));
    }
  }, []);

  const updatePromptState = useCallback((key: keyof PromptState, value: string | string[]) => {
    setPromptState(prev => ({ ...prev, [key]: value }));
    setAnimatePrompt(true);
    setTimeout(() => setAnimatePrompt(false), 300);
  }, []);

  const toggleSpecialEffect = useCallback((effect: string) => {
    setPromptState(prev => ({
      ...prev,
      specialEffects: prev.specialEffects.includes(effect)
        ? prev.specialEffects.filter(e => e !== effect)
        : [...prev.specialEffects, effect]
    }));
  }, []);

  const toggleAccessory = useCallback((accessory: string) => {
    setPromptState(prev => ({
      ...prev,
      accessories: prev.accessories.includes(accessory)
        ? prev.accessories.filter(a => a !== accessory)
        : [...prev.accessories, accessory]
    }));
  }, []);

  const generatePrompt = useCallback(() => {
    const parts = [];
    
    if (promptState.subject) parts.push(promptState.subject);
    if (promptState.age) parts.push(promptState.age);
    if (promptState.gender) parts.push(promptState.gender);
    if (promptState.characterDetails) parts.push(promptState.characterDetails);
    if (promptState.accessories.length > 0) parts.push(`wearing ${promptState.accessories.join(', ')}`);
    if (promptState.style) parts.push(promptState.style);
    if (promptState.artistStyle) parts.push(`in the style of ${promptState.artistStyle}`);
    if (promptState.environment) parts.push(`in ${promptState.environment}`);
    if (promptState.timeOfDay) parts.push(`during ${promptState.timeOfDay}`);
    if (promptState.weather) parts.push(`${promptState.weather} weather`);
    if (promptState.lighting) parts.push(promptState.lighting);
    if (promptState.mood) parts.push(`${promptState.mood} mood`);
    if (promptState.composition) parts.push(promptState.composition);
    if (promptState.camera) parts.push(`shot with ${promptState.camera}`);
    if (promptState.colorPalette) parts.push(promptState.colorPalette);
    if (promptState.specialEffects.length > 0) parts.push(promptState.specialEffects.join(', '));
    if (promptState.quality) parts.push(promptState.quality);
    if (promptState.additionalDetails) parts.push(promptState.additionalDetails);
    
    let prompt = parts.filter(Boolean).join(', ');
    
    if (promptState.aspectRatio) {
      prompt += ` --ar ${promptState.aspectRatio.split(' ')[0]}`;
    }
    
    if (promptState.negativePrompt) {
      prompt += ` --no ${promptState.negativePrompt}`;
    }
    
    return prompt;
  }, [promptState]);

  const copyToClipboard = async () => {
    const prompt = generatePrompt();
    await navigator.clipboard.writeText(prompt);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  const resetPrompt = () => {
    setPromptState(initialState);
    setAnimatePrompt(true);
    setTimeout(() => setAnimatePrompt(false), 300);
  };

  const downloadPrompt = () => {
    const prompt = generatePrompt();
    const blob = new Blob([prompt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-prompt.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const savePrompt = () => {
    if (!savePromptName.trim()) return;
    
    const newPrompt: SavedPrompt = {
      id: Date.now().toString(),
      name: savePromptName,
      prompt: generatePrompt(),
      timestamp: new Date(),
      state: { ...promptState }
    };
    
    const updated = [newPrompt, ...savedPrompts];
    setSavedPrompts(updated);
    localStorage.setItem('aiPromptBuilder_savedPrompts', JSON.stringify(updated));
    setShowSaveDialog(false);
    setSavePromptName('');
  };

  const loadPrompt = (savedPrompt: SavedPrompt) => {
    setPromptState(savedPrompt.state);
    setShowHistory(false);
    setAnimatePrompt(true);
    setTimeout(() => setAnimatePrompt(false), 300);
  };

  const loadPreset = (preset: any) => {
    setPromptState(preset.state);
    setAnimatePrompt(true);
    setTimeout(() => setAnimatePrompt(false), 300);
  };

  const randomizePrompt = () => {
    const randomState = { ...initialState };
    
    // Randomly select from each category
    Object.keys(options).forEach(key => {
      if (key === 'specialEffects' || key === 'accessories') {
        const items = options[key as keyof typeof options] as string[];
        const randomCount = Math.floor(Math.random() * 3) + 1;
        randomState[key as keyof PromptState] = items
          .sort(() => 0.5 - Math.random())
          .slice(0, randomCount) as any;
      } else {
        const items = options[key as keyof typeof options] as string[];
        if (Math.random() > 0.3) { // 70% chance to include each field
          randomState[key as keyof PromptState] = items[Math.floor(Math.random() * items.length)] as any;
        }
      }
    });
    
    setPromptState(randomState);
    setAnimatePrompt(true);
    setTimeout(() => setAnimatePrompt(false), 300);
  };

  const renderCategoryContent = () => {
    switch (activeCategory) {
      case 'subject':
        return (
          <div className="space-y-6">
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <Users className="h-4 w-4 mr-2 text-purple-600" />
                Main Subject
              </label>
              <textarea
                value={promptState.subject}
                onChange={(e) => updatePromptState('subject', e.target.value)}
                placeholder="Describe the main subject (e.g., 'A majestic lion', 'A futuristic robot', 'A beautiful woman')"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-gray-50"
                rows={3}
              />
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
      
      case 'style':
        return (
          <div className="space-y-6">
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <Palette className="h-4 w-4 mr-2 text-blue-600" />
                Art Style
              </label>
              <select
                value={promptState.style}
                onChange={(e) => updatePromptState('style', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-blue-50"
              >
                <option value="">Select a style...</option>
                {options.style.map(style => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
            </div>
            
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Artist Style Reference</label>
              <select
                value={promptState.artistStyle}
                onChange={(e) => updatePromptState('artistStyle', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-blue-50"
              >
                <option value="">Select an artist...</option>
                {options.artistStyle.map(artist => (
                  <option key={artist} value={artist}>{artist}</option>
                ))}
              </select>
            </div>
            
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Color Palette</label>
              <select
                value={promptState.colorPalette}
                onChange={(e) => updatePromptState('colorPalette', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-blue-50"
              >
                <option value="">Select color palette...</option>
                {options.colorPalette.map(palette => (
                  <option key={palette} value={palette}>{palette}</option>
                ))}
              </select>
            </div>
          </div>
        );
      
      case 'lighting':
        return (
          <div className="space-y-6">
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <Sun className="h-4 w-4 mr-2 text-yellow-600" />
                Lighting
              </label>
              <select
                value={promptState.lighting}
                onChange={(e) => updatePromptState('lighting', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-yellow-50"
              >
                <option value="">Select lighting...</option>
                {options.lighting.map(lighting => (
                  <option key={lighting} value={lighting}>{lighting}</option>
                ))}
              </select>
            </div>
            
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Mood</label>
              <select
                value={promptState.mood}
                onChange={(e) => updatePromptState('mood', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-yellow-50"
              >
                <option value="">Select mood...</option>
                {options.mood.map(mood => (
                  <option key={mood} value={mood}>{mood}</option>
                ))}
              </select>
            </div>
            
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Time of Day</label>
              <select
                value={promptState.timeOfDay}
                onChange={(e) => updatePromptState('timeOfDay', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-yellow-50"
              >
                <option value="">Select time...</option>
                {options.timeOfDay.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
        );
      
      case 'camera':
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
      
      case 'environment':
        return (
          <div className="space-y-6">
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <Map className="h-4 w-4 mr-2 text-indigo-600" />
                Environment/Setting
              </label>
              <select
                value={promptState.environment}
                onChange={(e) => updatePromptState('environment', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-indigo-50"
              >
                <option value="">Select environment...</option>
                {options.environment.map(env => (
                  <option key={env} value={env}>{env}</option>
                ))}
              </select>
            </div>
            
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Weather</label>
              <select
                value={promptState.weather}
                onChange={(e) => updatePromptState('weather', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-indigo-50"
              >
                <option value="">Select weather...</option>
                {options.weather.map(weather => (
                  <option key={weather} value={weather}>{weather}</option>
                ))}
              </select>
            </div>
          </div>
        );
      
      case 'effects':
        return (
          <div className="space-y-6">
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <Star className="h-4 w-4 mr-2 text-pink-600" />
                Quality Settings
              </label>
              <select
                value={promptState.quality}
                onChange={(e) => updatePromptState('quality', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-pink-50"
              >
                <option value="">Select quality...</option>
                {options.quality.map(quality => (
                  <option key={quality} value={quality}>{quality}</option>
                ))}
              </select>
            </div>
            
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center justify-between">
                <span className="flex items-center">
                  <Wand2 className="h-4 w-4 mr-2 text-pink-600" />
                  Special Effects
                </span>
                <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                  {promptState.specialEffects.length} selected
                </span>
              </label>
              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto border-2 border-gray-200 rounded-xl p-4 bg-gradient-to-br from-white to-pink-50">
                {options.specialEffects.map(effect => (
                  <label key={effect} className="flex items-center space-x-2 cursor-pointer hover:bg-pink-100 p-2 rounded-lg transition-all duration-200 group">
                    <input
                      type="checkbox"
                      checked={promptState.specialEffects.includes(effect)}
                      onChange={() => toggleSpecialEffect(effect)}
                      className="rounded border-gray-300 text-pink-600 focus:ring-pink-500 transition-all duration-200"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-pink-700 transition-colors duration-200">{effect}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Negative Prompt (What to avoid)</label>
              <textarea
                value={promptState.negativePrompt}
                onChange={(e) => updatePromptState('negativePrompt', e.target.value)}
                placeholder="Things to avoid in the image (e.g., 'blurry, low quality, distorted')"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-pink-50"
                rows={2}
              />
            </div>
            
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Additional Details</label>
              <textarea
                value={promptState.additionalDetails}
                onChange={(e) => updatePromptState('additionalDetails', e.target.value)}
                placeholder="Any additional details or specific requirements"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 bg-gradient-to-r from-white to-pink-50"
                rows={2}
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Sparkles className="h-12 w-12 text-purple-600 mr-3 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              AI Prompt Builder Pro
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Create stunning, professional prompts for AI image and video generation. 
            Build comprehensive prompts with advanced controls, presets, and real-time preview.
          </p>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button
              onClick={randomizePrompt}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Shuffle className="h-4 w-4" />
              <span>Randomize</span>
            </button>
            <button
              onClick={() => setShowHistory(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <History className="h-4 w-4" />
              <span>History</span>
            </button>
          </div>
          
          {/* Presets */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {presetPrompts.map((preset, index) => (
              <button
                key={preset.name}
                onClick={() => loadPreset(preset)}
                className="bg-white/80 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-full hover:bg-white hover:shadow-md transition-all duration-300 transform hover:scale-105 text-sm font-medium text-gray-700"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sticky top-8 border border-white/20">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Settings className="h-5 w-5 mr-2 text-purple-600" />
                Categories
              </h2>
              <nav className="space-y-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                        activeCategory === category.id
                          ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                          : 'text-gray-600 hover:bg-gray-50 hover:shadow-md'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{category.name}</span>
                      {activeCategory === category.id && (
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
              <div className="flex items-center mb-8">
                {(() => {
                  const activeIcon = categories.find(cat => cat.id === activeCategory)?.icon;
                  const activeColor = categories.find(cat => cat.id === activeCategory)?.color;
                  const Icon = activeIcon || Sparkles;
                  return (
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${activeColor} mr-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  );
                })()}
                <h2 className="text-2xl font-bold text-gray-900">
                  {categories.find(cat => cat.id === activeCategory)?.name}
                </h2>
              </div>
              <div className="transition-all duration-500 ease-in-out">
                {renderCategoryContent()}
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sticky top-8 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-purple-600" />
                  Live Preview
                </h3>
                <Zap className="h-5 w-5 text-yellow-500 animate-pulse" />
              </div>
              
              <div className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6 min-h-[300px] border-2 border-dashed border-gray-200 transition-all duration-300 ${animatePrompt ? 'scale-105 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50' : ''}`}>
                <p className="text-sm text-gray-800 whitespace-pre-wrap break-words leading-relaxed">
                  {generatePrompt() || (
                    <span className="text-gray-400 italic">
                      Your generated prompt will appear here as you make selections...
                      <br /><br />
                      ✨ Start by selecting a category and filling in the details!
                    </span>
                  )}
                </p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={copyToClipboard}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Copy className="h-4 w-4" />
                  <span>{copiedMessage ? '✅ Copied!' : 'Copy Prompt'}</span>
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setShowSaveDialog(true)}
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                  
                  <button
                    onClick={downloadPrompt}
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
                
                <button
                  onClick={resetPrompt}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-3 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Reset All</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-16 border-t border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-6 w-6 text-purple-600" />
                <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  AI Prompt Builder Pro
                </span>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                <span>by</span>
                <a 
                  href="https://github.com/VanessaEvo" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-purple-600 hover:text-purple-800 transition-colors duration-200 font-medium"
                >
                  <Github className="h-4 w-4" />
                  <span>ShinX</span>
                </a>
              </div>
              
              <div className="hidden md:block w-px h-4 bg-gray-300"></div>
              
              <div className="text-center md:text-left">
                <span>© 2025 ShinX. All rights reserved.</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/20 text-center">
            <p className="text-xs text-gray-500">
              A powerful tool for creating professional AI prompts for image and video generation
            </p>
          </div>
        </div>
      </footer>

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all duration-300 scale-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Save Prompt</h3>
            <input
              type="text"
              value={savePromptName}
              onChange={(e) => setSavePromptName(e.target.value)}
              placeholder="Enter prompt name..."
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-6"
              autoFocus
            />
            <div className="flex space-x-3">
              <button
                onClick={savePrompt}
                disabled={!savePromptName.trim()}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
              <button
                onClick={() => setShowSaveDialog(false)}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-300 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Dialog */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Saved Prompts</h3>
              <button
                onClick={() => setShowHistory(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                ✕
              </button>
            </div>
            {savedPrompts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No saved prompts yet.</p>
            ) : (
              <div className="space-y-4">
                {savedPrompts.map((saved) => (
                  <div key={saved.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{saved.name}</h4>
                      <span className="text-xs text-gray-500">
                        {saved.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{saved.prompt}</p>
                    <button
                      onClick={() => loadPrompt(saved)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 text-sm"
                    >
                      Load Prompt
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}