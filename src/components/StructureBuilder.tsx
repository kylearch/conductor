import React from 'react';
import { MusicSection } from '../types';
import { SECTION_TYPES, INSTRUMENT_OPTIONS } from '../presets';
import './StructureBuilder.css';

interface StructureBuilderProps {
  sections: MusicSection[];
  onSectionsChange: (sections: MusicSection[]) => void;
}

const StructureBuilder: React.FC<StructureBuilderProps> = ({
  sections,
  onSectionsChange,
}) => {
  const addSection = () => {
    const newSection: MusicSection = {
      id: Date.now().toString(),
      type: 'Verse',
      instrument: 'ambient pad',
    };
    onSectionsChange([...sections, newSection]);
  };

  const removeSection = (id: string) => {
    onSectionsChange(sections.filter((section) => section.id !== id));
  };

  const updateSection = (id: string, field: 'type' | 'instrument', value: string) => {
    onSectionsChange(
      sections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    
    [newSections[index], newSections[targetIndex]] = [
      newSections[targetIndex],
      newSections[index],
    ];
    
    onSectionsChange(newSections);
  };

  return (
    <div className="structure-builder">
      <div className="structure-header">
        <h3>Structure Builder</h3>
        <div className="section-count">
          {sections.length} section{sections.length !== 1 ? 's' : ''} 
          {sections.length >= 12 && <span className="count-badge">✓ 3min+</span>}
          {sections.length < 12 && sections.length >= 8 && <span className="count-badge-warning">~2min</span>}
        </div>
      </div>
      <p className="structure-hint">
        💡 Use 12+ sections for 3-minute tracks. Each section adds ~15 seconds.
      </p>
      
      <div className="sections-list">
        {sections.map((section, index) => (
          <div key={section.id} className="section-item">
            <div className="section-number">{index + 1}</div>
            <div className="section-controls">
              <select
                value={section.type}
                onChange={(e) => updateSection(section.id, 'type', e.target.value)}
                className="section-select"
              >
                {SECTION_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              
              <select
                value={section.instrument}
                onChange={(e) =>
                  updateSection(section.id, 'instrument', e.target.value)
                }
                className="section-select"
              >
                {INSTRUMENT_OPTIONS.map((instrument) => (
                  <option key={instrument} value={instrument}>
                    {instrument}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="section-actions">
              <button
                type="button"
                onClick={() => moveSection(index, 'up')}
                disabled={index === 0}
                className="section-btn"
                aria-label="Move up"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => moveSection(index, 'down')}
                disabled={index === sections.length - 1}
                className="section-btn"
                aria-label="Move down"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => removeSection(section.id)}
                className="section-btn section-remove"
                aria-label="Remove section"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <button type="button" onClick={addSection} className="add-section-btn">
        + Add Section
      </button>
    </div>
  );
};

export default StructureBuilder;
