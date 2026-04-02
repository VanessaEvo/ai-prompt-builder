export interface Translation {
  header: {
    title: string;
    subtitle: string;
    randomize: string;
    history: string;
    settings: string;
  };
  categories: {
    subject: string;
    artStyle: string;
    lighting: string;
    camera: string;
    environment: string;
    effects: string;
  };
  buttons: {
    copy: string;
    download: string;
    reset: string;
    save: string;
    enhance: string;
    load: string;
    delete: string;
    cancel: string;
    saveSettings: string;
  };
  labels: {
    subject: string;
    subjectPlaceholder: string;
    characterDetails: string;
    characterDetailsPlaceholder: string;
    ageRange: string;
    gender: string;
    accessories: string;
    artStyle: string;
    artistStyle: string;
    lighting: string;
    mood: string;
    timeOfDay: string;
    composition: string;
    camera: string;
    aspectRatio: string;
    environment: string;
    weather: string;
    colorPalette: string;
    specialEffects: string;
    quality: string;
    negativePrompt: string;
    negativePromptPlaceholder: string;
    additionalDetails: string;
    additionalDetailsPlaceholder: string;
  };
  settings: {
    title: string;
    apiKey: string;
    apiKeyPlaceholder: string;
    apiKeyHelp: string;
    darkMode: string;
    language: string;
  };
  savedPrompts: {
    title: string;
    empty: string;
    saveDialogTitle: string;
    promptName: string;
    promptNamePlaceholder: string;
  };
  preview: {
    title: string;
    empty: string;
    tooltip: string;
  };
  presets: {
    portrait: string;
    fantasy: string;
    anime: string;
  };
}

export const translations: Record<string, Translation> = {
  en: {
    header: {
      title: 'AI Prompt Builder Pro',
      subtitle: 'Create stunning, professional prompts for AI image and video generation. Build comprehensive prompts with advanced controls, presets, and real-time preview.',
      randomize: 'Randomize',
      history: 'History',
      settings: 'Settings',
    },
    categories: {
      subject: 'Subject & Content',
      artStyle: 'Art Style',
      lighting: 'Lighting & Mood',
      camera: 'Camera & Composition',
      environment: 'Environment',
      effects: 'Effects & Quality',
    },
    buttons: {
      copy: 'Copy',
      download: 'Download',
      reset: 'Reset',
      save: 'Save',
      enhance: 'Enhance',
      load: 'Load Prompt',
      delete: 'Delete',
      cancel: 'Cancel',
      saveSettings: 'Save Settings',
    },
    labels: {
      subject: 'Main Subject',
      subjectPlaceholder: "Describe the main subject (e.g., 'A majestic lion', 'A futuristic robot', 'A beautiful woman')",
      characterDetails: 'Character Details',
      characterDetailsPlaceholder: 'Add specific character details (e.g., long flowing hair, blue eyes, athletic build)',
      ageRange: 'Age Range',
      gender: 'Gender',
      accessories: 'Accessories & Props',
      artStyle: 'Art Style',
      artistStyle: 'Artist Style Reference',
      lighting: 'Lighting',
      mood: 'Mood',
      timeOfDay: 'Time of Day',
      composition: 'Composition',
      camera: 'Camera',
      aspectRatio: 'Aspect Ratio',
      environment: 'Environment/Location',
      weather: 'Weather',
      colorPalette: 'Color Palette',
      specialEffects: 'Special Effects',
      quality: 'Quality & Details',
      negativePrompt: 'Negative Prompt',
      negativePromptPlaceholder: 'What to avoid in the image (e.g., blurry, low quality, distorted)',
      additionalDetails: 'Additional Details',
      additionalDetailsPlaceholder: 'Add any custom details or requirements',
    },
    settings: {
      title: 'Settings',
      apiKey: 'Google Gemini API Key',
      apiKeyPlaceholder: 'Enter your API Key',
      apiKeyHelp: 'Your key is stored locally in your browser and used only for the "Magic Enhance" feature.',
      darkMode: 'Dark Mode',
      language: 'Language',
    },
    savedPrompts: {
      title: 'Saved Prompts',
      empty: 'No saved prompts yet.',
      saveDialogTitle: 'Save Prompt',
      promptName: 'Prompt Name',
      promptNamePlaceholder: 'Enter a name for this prompt',
    },
    preview: {
      title: 'Live Preview',
      empty: 'Your prompt will appear here as you make selections',
      tooltip: 'Real-time preview of your prompt',
    },
    presets: {
      portrait: 'Portrait Photography',
      fantasy: 'Fantasy Art',
      anime: 'Anime Character',
    },
  },
  es: {
    header: {
      title: 'Generador de Prompts IA Pro',
      subtitle: 'Crea prompts impresionantes y profesionales para generación de imágenes y videos con IA. Construye prompts completos con controles avanzados, plantillas y vista previa en tiempo real.',
      randomize: 'Aleatorio',
      history: 'Historial',
      settings: 'Configuración',
    },
    categories: {
      subject: 'Sujeto y Contenido',
      artStyle: 'Estilo Artístico',
      lighting: 'Iluminación y Ambiente',
      camera: 'Cámara y Composición',
      environment: 'Entorno',
      effects: 'Efectos y Calidad',
    },
    buttons: {
      copy: 'Copiar',
      download: 'Descargar',
      reset: 'Reiniciar',
      save: 'Guardar',
      enhance: 'Mejorar',
      load: 'Cargar Prompt',
      delete: 'Eliminar',
      cancel: 'Cancelar',
      saveSettings: 'Guardar Configuración',
    },
    labels: {
      subject: 'Sujeto Principal',
      subjectPlaceholder: "Describe el sujeto principal (ej., 'Un león majestuoso', 'Un robot futurista', 'Una mujer hermosa')",
      characterDetails: 'Detalles del Personaje',
      characterDetailsPlaceholder: 'Añade detalles específicos del personaje (ej., cabello largo y fluido, ojos azules, constitución atlética)',
      ageRange: 'Rango de Edad',
      gender: 'Género',
      accessories: 'Accesorios y Props',
      artStyle: 'Estilo Artístico',
      artistStyle: 'Referencia de Estilo de Artista',
      lighting: 'Iluminación',
      mood: 'Ambiente',
      timeOfDay: 'Hora del Día',
      composition: 'Composición',
      camera: 'Cámara',
      aspectRatio: 'Relación de Aspecto',
      environment: 'Entorno/Ubicación',
      weather: 'Clima',
      colorPalette: 'Paleta de Colores',
      specialEffects: 'Efectos Especiales',
      quality: 'Calidad y Detalles',
      negativePrompt: 'Prompt Negativo',
      negativePromptPlaceholder: 'Qué evitar en la imagen (ej., borroso, baja calidad, distorsionado)',
      additionalDetails: 'Detalles Adicionales',
      additionalDetailsPlaceholder: 'Añade cualquier detalle personalizado o requisitos',
    },
    settings: {
      title: 'Configuración',
      apiKey: 'Clave API de Google Gemini',
      apiKeyPlaceholder: 'Ingresa tu Clave API',
      apiKeyHelp: 'Tu clave se almacena localmente en tu navegador y solo se usa para la función "Mejora Mágica".',
      darkMode: 'Modo Oscuro',
      language: 'Idioma',
    },
    savedPrompts: {
      title: 'Prompts Guardados',
      empty: 'Aún no hay prompts guardados.',
      saveDialogTitle: 'Guardar Prompt',
      promptName: 'Nombre del Prompt',
      promptNamePlaceholder: 'Ingresa un nombre para este prompt',
    },
    preview: {
      title: 'Vista Previa en Vivo',
      empty: 'Tu prompt aparecerá aquí mientras haces selecciones',
      tooltip: 'Vista previa en tiempo real de tu prompt',
    },
    presets: {
      portrait: 'Fotografía de Retrato',
      fantasy: 'Arte Fantástico',
      anime: 'Personaje de Anime',
    },
  },
  fr: {
    header: {
      title: 'Générateur de Prompts IA Pro',
      subtitle: 'Créez des prompts époustouflants et professionnels pour la génération d\'images et de vidéos par IA. Créez des prompts complets avec des contrôles avancés, des préréglages et un aperçu en temps réel.',
      randomize: 'Aléatoire',
      history: 'Historique',
      settings: 'Paramètres',
    },
    categories: {
      subject: 'Sujet et Contenu',
      artStyle: 'Style Artistique',
      lighting: 'Éclairage et Ambiance',
      camera: 'Caméra et Composition',
      environment: 'Environnement',
      effects: 'Effets et Qualité',
    },
    buttons: {
      copy: 'Copier',
      download: 'Télécharger',
      reset: 'Réinitialiser',
      save: 'Enregistrer',
      enhance: 'Améliorer',
      load: 'Charger le Prompt',
      delete: 'Supprimer',
      cancel: 'Annuler',
      saveSettings: 'Enregistrer les Paramètres',
    },
    labels: {
      subject: 'Sujet Principal',
      subjectPlaceholder: "Décrivez le sujet principal (par ex., 'Un lion majestueux', 'Un robot futuriste', 'Une belle femme')",
      characterDetails: 'Détails du Personnage',
      characterDetailsPlaceholder: 'Ajoutez des détails spécifiques du personnage (par ex., longs cheveux fluides, yeux bleus, carrure athlétique)',
      ageRange: 'Tranche d\'Âge',
      gender: 'Genre',
      accessories: 'Accessoires et Props',
      artStyle: 'Style Artistique',
      artistStyle: 'Référence de Style d\'Artiste',
      lighting: 'Éclairage',
      mood: 'Ambiance',
      timeOfDay: 'Heure de la Journée',
      composition: 'Composition',
      camera: 'Caméra',
      aspectRatio: 'Rapport d\'Aspect',
      environment: 'Environnement/Lieu',
      weather: 'Météo',
      colorPalette: 'Palette de Couleurs',
      specialEffects: 'Effets Spéciaux',
      quality: 'Qualité et Détails',
      negativePrompt: 'Prompt Négatif',
      negativePromptPlaceholder: 'Ce qu\'il faut éviter dans l\'image (par ex., flou, basse qualité, déformé)',
      additionalDetails: 'Détails Supplémentaires',
      additionalDetailsPlaceholder: 'Ajoutez des détails personnalisés ou des exigences',
    },
    settings: {
      title: 'Paramètres',
      apiKey: 'Clé API Google Gemini',
      apiKeyPlaceholder: 'Entrez votre Clé API',
      apiKeyHelp: 'Votre clé est stockée localement dans votre navigateur et n\'est utilisée que pour la fonction "Amélioration Magique".',
      darkMode: 'Mode Sombre',
      language: 'Langue',
    },
    savedPrompts: {
      title: 'Prompts Enregistrés',
      empty: 'Aucun prompt enregistré pour le moment.',
      saveDialogTitle: 'Enregistrer le Prompt',
      promptName: 'Nom du Prompt',
      promptNamePlaceholder: 'Entrez un nom pour ce prompt',
    },
    preview: {
      title: 'Aperçu en Direct',
      empty: 'Votre prompt apparaîtra ici au fur et à mesure de vos sélections',
      tooltip: 'Aperçu en temps réel de votre prompt',
    },
    presets: {
      portrait: 'Photographie de Portrait',
      fantasy: 'Art Fantastique',
      anime: 'Personnage d\'Anime',
    },
  },
  de: {
    header: {
      title: 'KI-Prompt-Generator Pro',
      subtitle: 'Erstellen Sie beeindruckende, professionelle Prompts für KI-Bild- und Videogenerierung. Erstellen Sie umfassende Prompts mit erweiterten Steuerelementen, Voreinstellungen und Echtzeitvorschau.',
      randomize: 'Zufällig',
      history: 'Verlauf',
      settings: 'Einstellungen',
    },
    categories: {
      subject: 'Thema & Inhalt',
      artStyle: 'Kunststil',
      lighting: 'Beleuchtung & Stimmung',
      camera: 'Kamera & Komposition',
      environment: 'Umgebung',
      effects: 'Effekte & Qualität',
    },
    buttons: {
      copy: 'Kopieren',
      download: 'Herunterladen',
      reset: 'Zurücksetzen',
      save: 'Speichern',
      enhance: 'Verbessern',
      load: 'Prompt Laden',
      delete: 'Löschen',
      cancel: 'Abbrechen',
      saveSettings: 'Einstellungen Speichern',
    },
    labels: {
      subject: 'Hauptthema',
      subjectPlaceholder: "Beschreiben Sie das Hauptthema (z.B., 'Ein majestätischer Löwe', 'Ein futuristischer Roboter', 'Eine schöne Frau')",
      characterDetails: 'Charakterdetails',
      characterDetailsPlaceholder: 'Fügen Sie spezifische Charakterdetails hinzu (z.B., langes fließendes Haar, blaue Augen, athletischer Körperbau)',
      ageRange: 'Altersgruppe',
      gender: 'Geschlecht',
      accessories: 'Accessoires & Requisiten',
      artStyle: 'Kunststil',
      artistStyle: 'Künstlerstil-Referenz',
      lighting: 'Beleuchtung',
      mood: 'Stimmung',
      timeOfDay: 'Tageszeit',
      composition: 'Komposition',
      camera: 'Kamera',
      aspectRatio: 'Seitenverhältnis',
      environment: 'Umgebung/Ort',
      weather: 'Wetter',
      colorPalette: 'Farbpalette',
      specialEffects: 'Spezialeffekte',
      quality: 'Qualität & Details',
      negativePrompt: 'Negativer Prompt',
      negativePromptPlaceholder: 'Was im Bild vermieden werden soll (z.B., verschwommen, niedrige Qualität, verzerrt)',
      additionalDetails: 'Zusätzliche Details',
      additionalDetailsPlaceholder: 'Fügen Sie benutzerdefinierte Details oder Anforderungen hinzu',
    },
    settings: {
      title: 'Einstellungen',
      apiKey: 'Google Gemini API-Schlüssel',
      apiKeyPlaceholder: 'Geben Sie Ihren API-Schlüssel ein',
      apiKeyHelp: 'Ihr Schlüssel wird lokal in Ihrem Browser gespeichert und nur für die Funktion "Magische Verbesserung" verwendet.',
      darkMode: 'Dunkler Modus',
      language: 'Sprache',
    },
    savedPrompts: {
      title: 'Gespeicherte Prompts',
      empty: 'Noch keine gespeicherten Prompts.',
      saveDialogTitle: 'Prompt Speichern',
      promptName: 'Prompt-Name',
      promptNamePlaceholder: 'Geben Sie einen Namen für diesen Prompt ein',
    },
    preview: {
      title: 'Live-Vorschau',
      empty: 'Ihr Prompt wird hier angezeigt, während Sie Auswahlen treffen',
      tooltip: 'Echtzeitvorschau Ihres Prompts',
    },
    presets: {
      portrait: 'Porträtfotografie',
      fantasy: 'Fantasy-Kunst',
      anime: 'Anime-Charakter',
    },
  },
  ja: {
    header: {
      title: 'AIプロンプトビルダー Pro',
      subtitle: 'AI画像・動画生成のための素晴らしいプロフェッショナルなプロンプトを作成。高度なコントロール、プリセット、リアルタイムプレビューで包括的なプロンプトを構築。',
      randomize: 'ランダム',
      history: '履歴',
      settings: '設定',
    },
    categories: {
      subject: '主題とコンテンツ',
      artStyle: 'アートスタイル',
      lighting: '照明と雰囲気',
      camera: 'カメラと構図',
      environment: '環境',
      effects: 'エフェクトと品質',
    },
    buttons: {
      copy: 'コピー',
      download: 'ダウンロード',
      reset: 'リセット',
      save: '保存',
      enhance: '強化',
      load: 'プロンプトを読み込む',
      delete: '削除',
      cancel: 'キャンセル',
      saveSettings: '設定を保存',
    },
    labels: {
      subject: 'メイン主題',
      subjectPlaceholder: "メイン主題を説明 (例: '威厳のあるライオン', '未来的なロボット', '美しい女性')",
      characterDetails: 'キャラクター詳細',
      characterDetailsPlaceholder: '具体的なキャラクター詳細を追加 (例: 長く流れる髪、青い目、スポーティな体型)',
      ageRange: '年齢層',
      gender: '性別',
      accessories: 'アクセサリーと小道具',
      artStyle: 'アートスタイル',
      artistStyle: 'アーティストスタイル参照',
      lighting: '照明',
      mood: '雰囲気',
      timeOfDay: '時間帯',
      composition: '構図',
      camera: 'カメラ',
      aspectRatio: 'アスペクト比',
      environment: '環境/場所',
      weather: '天気',
      colorPalette: 'カラーパレット',
      specialEffects: '特殊効果',
      quality: '品質と詳細',
      negativePrompt: 'ネガティブプロンプト',
      negativePromptPlaceholder: '画像で避けるべきもの (例: ぼやけた、低品質、歪んだ)',
      additionalDetails: '追加詳細',
      additionalDetailsPlaceholder: 'カスタム詳細や要件を追加',
    },
    settings: {
      title: '設定',
      apiKey: 'Google Gemini APIキー',
      apiKeyPlaceholder: 'APIキーを入力',
      apiKeyHelp: 'キーはブラウザにローカルに保存され、「マジック強化」機能にのみ使用されます。',
      darkMode: 'ダークモード',
      language: '言語',
    },
    savedPrompts: {
      title: '保存されたプロンプト',
      empty: 'まだ保存されたプロンプトはありません。',
      saveDialogTitle: 'プロンプトを保存',
      promptName: 'プロンプト名',
      promptNamePlaceholder: 'このプロンプトの名前を入力',
    },
    preview: {
      title: 'ライブプレビュー',
      empty: '選択するとプロンプトがここに表示されます',
      tooltip: 'プロンプトのリアルタイムプレビュー',
    },
    presets: {
      portrait: 'ポートレート写真',
      fantasy: 'ファンタジーアート',
      anime: 'アニメキャラクター',
    },
  },
};
