import { useState } from 'react';
import { AIGenerationParams, MusicSection } from '../types';
import { INSTRUMENT_OPTIONS } from '../presets';
import './AIGenerator.css';

interface AIGeneratorProps {
  category: 'Brand Theme' | 'Lullaby';
  styleTags: string[];
  excludeTags: string[];
  onGenerate: (params: AIGenerationParams) => Promise<MusicSection[][]>;
  onSelectVariation: (sections: MusicSection[]) => void;
}

export default function AIGenerator({
  category,
  styleTags,
  excludeTags,
  onGenerate,
  onSelectVariation,
}: AIGeneratorProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDuration, setTargetDuration] = useState(category === 'Brand Theme' ? 60 : 180);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [variationCount, setVariationCount] = useState(3);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVariations, setGeneratedVariations] = useState<MusicSection[][] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const minDuration = category === 'Brand Theme' ? 30 : 120;
  const maxDuration = category === 'Brand Theme' ? 120 : 300;
  const estimatedSections = Math.ceil(targetDuration / 15);

  const toggleInstrument = (instrument: string) => {
    setSelectedInstruments((prev) =>
      prev.includes(instrument)
        ? prev.filter((i) => i !== instrument)
        : [...prev, instrument]
    );
  };

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }

    if (selectedInstruments.length === 0) {
      setError('Please select at least one instrument');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedVariations(null);

    try {
      const params: AIGenerationParams = {
        title: title.trim() || undefined,
        description: description.trim(),
        category,
        targetDuration,
        instruments: selectedInstruments,
        styleTags,
        excludeTags,
        variationCount,
      };

      const variations = await onGenerate(params);
      setGeneratedVariations(variations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate variations');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectVariation = (variation: MusicSection[]) => {
    onSelectVariation(variation);
    // Optionally collapse after selection
    // setIsExpanded(false);
  };

  const canGenerate = description.trim() !== '' && selectedInstruments.length > 0 && !isGenerating;

  return (
    <div className="ai-generator">
      <div className="ai-generator-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="ai-generator-title">
          <span className="ai-icon">✨</span>
          <h3>AI Prompt Generator</h3>
        </div>
        <button type="button" className="toggle-btn">
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>

      {isExpanded && (
        <div className="ai-generator-content">
          <div className="form-group">
            <label htmlFor="ai-title">Title (Optional)</label>
            <input
              id="ai-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Bedtime Adventure"
              disabled={isGenerating}
            />
          </div>

          <div className="form-group">
            <label htmlFor="ai-description">Description *</label>
            <textarea
              id="ai-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                category === 'Brand Theme'
                  ? 'Describe the brand theme... e.g., "A playful and energetic intro for a children\'s educational show about science"'
                  : 'Describe the lullaby... e.g., "A peaceful bedtime song with ocean sounds and gentle melodies"'
              }
              rows={3}
              disabled={isGenerating}
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration-slider">
              Target Duration: {Math.floor(targetDuration / 60)}:{(targetDuration % 60).toString().padStart(2, '0')}
              <span className="duration-hint">({estimatedSections} sections × 15s)</span>
            </label>
            <input
              id="duration-slider"
              type="range"
              min={minDuration}
              max={maxDuration}
              step={15}
              value={targetDuration}
              onChange={(e) => setTargetDuration(parseInt(e.target.value))}
              disabled={isGenerating}
            />
            <div className="duration-labels">
              <span>{Math.floor(minDuration / 60)}:{(minDuration % 60).toString().padStart(2, '0')}</span>
              <span>{Math.floor(maxDuration / 60)}:{(maxDuration % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>

          <div className="form-group">
            <label>Select Instruments *</label>
            <div className="instrument-grid">
              {INSTRUMENT_OPTIONS.map((instrument) => (
                <button
                  key={instrument}
                  type="button"
                  className={`instrument-btn ${selectedInstruments.includes(instrument) ? 'selected' : ''}`}
                  onClick={() => toggleInstrument(instrument)}
                  disabled={isGenerating}
                >
                  {instrument}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="select-all-btn"
              onClick={() =>
                setSelectedInstruments(
                  selectedInstruments.length === INSTRUMENT_OPTIONS.length ? [] : [...INSTRUMENT_OPTIONS]
                )
              }
              disabled={isGenerating}
            >
              {selectedInstruments.length === INSTRUMENT_OPTIONS.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="variation-count">Number of Variations</label>
            <div className="variation-controls">
              <input
                id="variation-count"
                type="number"
                min="1"
                max="5"
                value={variationCount}
                onChange={(e) => setVariationCount(Math.max(1, Math.min(5, parseInt(e.target.value) || 1)))}
                disabled={isGenerating}
              />
              <span className="variation-hint">Generate up to 5 variations</span>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="button"
            onClick={handleGenerate}
            disabled={!canGenerate}
            className="generate-btn-ai"
          >
            {isGenerating ? '🎵 Generating...' : '✨ Generate with AI'}
          </button>

          {generatedVariations && generatedVariations.length > 0 && (
            <div className="variations-list">
              <h4>Generated Variations ({generatedVariations.length})</h4>
              {generatedVariations.map((variation, index) => (
                <div key={index} className="variation-card">
                  <div className="variation-header">
                    <h5>Variation {index + 1}</h5>
                    <span className="section-count">{variation.length} sections (~{variation.length * 15}s)</span>
                  </div>
                  <div className="variation-preview">
                    {variation.map((section, sIdx) => (
                      <div key={sIdx} className="section-preview">
                        <span className="section-type">{section.type}</span>
                        <span className="section-separator">|</span>
                        <span className="section-instrument">{section.instrument}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="use-variation-btn"
                    onClick={() => handleSelectVariation(variation)}
                  >
                    Use This Variation
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
