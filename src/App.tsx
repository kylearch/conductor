import { useState } from 'react';
import TagInput from './components/TagInput';
import StructureBuilder from './components/StructureBuilder';
import LyricPromptEditor from './components/LyricPromptEditor';
import GenerationHistory from './components/GenerationHistory';
import { MusicGeneration, MusicSection, Preset } from './types';
import {
  PRESETS,
  STYLE_TAG_SUGGESTIONS,
  EXCLUDE_TAG_SUGGESTIONS,
} from './presets';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'Brand Theme' | 'Lullaby'>('Brand Theme');
  const [styleTags, setStyleTags] = useState<string[]>([]);
  const [excludeTags, setExcludeTags] = useState<string[]>([]);
  const [sections, setSections] = useState<MusicSection[]>([
    { id: '1', type: 'Intro', instrument: 'kalimba hook' },
    { id: '2', type: 'Verse', instrument: 'ambient pad' },
  ]);
  const [lyricPrompt, setLyricPrompt] = useState('');
  const [generations, setGenerations] = useState<MusicGeneration[]>([]);
  const [batchCount, setBatchCount] = useState(1);

  const loadPreset = (preset: Preset) => {
    setCategory(preset.category);
    setStyleTags([...preset.styleTags]);
    setExcludeTags([...preset.excludeTags]);
    setSections([...preset.sections]);
    setLyricPrompt(preset.lyricPromptTemplate);
  };

  const handleGenerate = () => {
    const baseGeneration = {
      name: name || `${category} - ${new Date().toLocaleTimeString()}`,
      category,
      styleTags: [...styleTags],
      excludeTags: [...excludeTags],
      sections: [...sections],
      lyricPrompt,
      generatedAt: new Date(),
    };

    const newGenerations = Array.from({ length: batchCount }, (_, index) => ({
      ...baseGeneration,
      id: `${Date.now()}-${index}`,
      name: batchCount > 1 ? `${baseGeneration.name} (${index + 1})` : baseGeneration.name,
    }));

    setGenerations([...newGenerations, ...generations]);
    setName('');
  };

  const handleRatingChange = (id: string, rating: number) => {
    setGenerations(
      generations.map((gen) =>
        gen.id === id ? { ...gen, rating } : gen
      )
    );
  };

  const handleDelete = (id: string) => {
    setGenerations(generations.filter((gen) => gen.id !== id));
  };

  const canGenerate = styleTags.length > 0 && sections.length > 0 && lyricPrompt.trim() !== '';

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎵 Suno Music Generator for Odie</h1>
        <p className="app-subtitle">
          Generate children's audio: Brand Themes and Lullabies
        </p>
      </header>

      <div className="app-content">
        <div className="main-panel">
          <div className="card">
            <h2>Configuration</h2>

            <div className="form-group">
              <label htmlFor="name">Generation Name (Optional)</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My Brand Theme"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as 'Brand Theme' | 'Lullaby')}
              >
                <option value="Brand Theme">Brand Theme</option>
                <option value="Lullaby">Lullaby</option>
              </select>
            </div>

            <div className="presets-section">
              <h3>Quick Start Presets</h3>
              <div className="presets-grid">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => loadPreset(preset)}
                    className="preset-btn"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <TagInput
              label="Style Tags"
              tags={styleTags}
              suggestions={STYLE_TAG_SUGGESTIONS}
              onTagsChange={setStyleTags}
              placeholder="Enter style tags (e.g., upbeat, playful)"
            />

            <TagInput
              label="Exclude Tags"
              tags={excludeTags}
              suggestions={EXCLUDE_TAG_SUGGESTIONS}
              onTagsChange={setExcludeTags}
              placeholder="Enter tags to exclude (e.g., dark, sad)"
            />

            <StructureBuilder sections={sections} onSectionsChange={setSections} />

            <LyricPromptEditor
              sections={sections}
              lyricPrompt={lyricPrompt}
              onLyricPromptChange={setLyricPrompt}
            />

            <div className="batch-generation">
              <label htmlFor="batch-count">Batch Generation</label>
              <div className="batch-controls">
                <input
                  id="batch-count"
                  type="number"
                  min="1"
                  max="10"
                  value={batchCount}
                  onChange={(e) => setBatchCount(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                />
                <span className="batch-hint">Generate {batchCount} variation{batchCount !== 1 ? 's' : ''}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={!canGenerate}
              className="generate-btn"
            >
              🎵 Generate {batchCount > 1 ? `${batchCount} ` : ''}Music
            </button>
            
            {!canGenerate && (
              <p className="validation-message">
                Please add at least one style tag, one section, and a lyric prompt.
              </p>
            )}
          </div>
        </div>

        <div className="sidebar">
          <GenerationHistory
            generations={generations}
            onRatingChange={handleRatingChange}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
