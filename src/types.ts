export interface MusicSection {
  id: string;
  type: string;
  instrument: string;
}

export interface MusicGeneration {
  id: string;
  name: string;
  category: 'Brand Theme' | 'Lullaby';
  styleTags: string[];
  excludeTags: string[];
  sections: MusicSection[];
  lyricPrompt: string;
  rating?: number;
  generatedAt: Date;
}

export interface Preset {
  name: string;
  category: 'Brand Theme' | 'Lullaby';
  styleTags: string[];
  excludeTags: string[];
  sections: MusicSection[];
  lyricPromptTemplate: string;
}
