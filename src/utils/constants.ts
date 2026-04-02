import { Users, Palette, Sun, Camera, Map, Wand2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { PromptState } from '../types/prompt';

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
}

export const initialState: PromptState = {
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
  additionalDetails: '',
  mjVersion: '',
  seed: '',
  sref: '',
  iw: '',
  tile: false
};

export const categories: Category[] = [
  { id: 'subject', name: 'Subject & Content', icon: Users, color: 'from-purple-500 to-pink-500' },
  { id: 'style', name: 'Art Style', icon: Palette, color: 'from-blue-500 to-cyan-500' },
  { id: 'lighting', name: 'Lighting & Mood', icon: Sun, color: 'from-yellow-500 to-orange-500' },
  { id: 'camera', name: 'Camera & Composition', icon: Camera, color: 'from-green-500 to-emerald-500' },
  { id: 'environment', name: 'Environment', icon: Map, color: 'from-indigo-500 to-purple-500' },
  { id: 'effects', name: 'Effects & Quality', icon: Wand2, color: 'from-pink-500 to-rose-500' }
];

export const options = {
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
  mjVersion: [
    'v7', 'v6.1', 'v6', 'v5.2', 'v5.1', 'v5'
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

export const presetPrompts = [
  {
    name: 'Architecture Photography',
    state: { ...initialState, subject: 'Modern building interior', style: 'Photorealistic', lighting: 'Golden hour', camera: 'Wide angle lens', quality: '8K resolution' }
  },
  {
    name: 'Food Photography',
    state: { ...initialState, subject: 'Gourmet meal presentation', style: 'Photorealistic', lighting: 'Soft diffused light', camera: 'Macro lens', quality: 'Professional quality' }
  },
  {
    name: 'Product Shot',
    state: { ...initialState, subject: 'Luxury product', style: '3D Render', lighting: 'Studio lighting', camera: 'Medium format', quality: 'Studio quality' }
  },
  {
    name: 'Landscape/Nature',
    state: { ...initialState, subject: 'Beautiful breathtaking landscape', style: 'Photorealistic', lighting: 'Natural lighting', environment: 'Mountain', quality: 'High resolution' }
  },
  {
    name: 'Abstract Art',
    state: { ...initialState, subject: 'Abstract concepts', style: 'Abstract', colorPalette: 'Vibrant colors', artistStyle: 'Kandinsky' }
  },
  {
    name: '3D Render',
    state: { ...initialState, subject: '3D isometric room', style: '3D Render', lighting: 'Cinematic lighting', quality: 'Masterpiece' }
  },
  {
    name: 'Vector Illustration',
    state: { ...initialState, subject: 'Flat vector graphic character', style: 'Vector Art', colorPalette: 'Flat colors' }
  },
  {
    name: 'Cinematic Scene',
    state: { ...initialState, subject: 'Movie scene action shot', style: 'Photorealistic', lighting: 'Cinematic lighting', camera: '35mm film', aspectRatio: '2.35:1 (Cinematic)' }
  },
  {
    name: 'Street Photography',
    state: { ...initialState, subject: 'Candid street portrait', style: 'Photorealistic', lighting: 'Natural lighting', environment: 'City', camera: '35mm film' }
  }
];
