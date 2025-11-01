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

export type LLMProvider = 'openai' | 'anthropic' | 'ollama' | 'openrouter';

export interface LLMConfig {
  provider: LLMProvider;
  apiKey: string;
  model: string;
  baseUrl?: string; // For Ollama or custom endpoints
}

export interface AIGenerationParams {
  title?: string;
  description: string;
  category: 'Brand Theme' | 'Lullaby';
  targetDuration: number; // in seconds
  instruments: string[];
  styleTags: string[];
  excludeTags: string[];
  variationCount: number;
}
