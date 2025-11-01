import React from 'react';
import { MusicSection } from '../types';
import './LyricPromptEditor.css';

interface LyricPromptEditorProps {
  sections: MusicSection[];
  lyricPrompt: string;
  onLyricPromptChange: (prompt: string) => void;
}

const LyricPromptEditor: React.FC<LyricPromptEditorProps> = ({
  sections,
  lyricPrompt,
  onLyricPromptChange,
}) => {
  const generatePromptFromSections = () => {
    const prompt = sections
      .map((section) => `[${section.type} | ${section.instrument}]`)
      .join('\n');
    onLyricPromptChange(prompt);
  };

  return (
    <div className="lyric-prompt-editor">
      <div className="prompt-header">
        <label>Lyric Prompt</label>
        <button
          type="button"
          onClick={generatePromptFromSections}
          className="generate-prompt-btn"
        >
          Generate from Structure
        </button>
      </div>
      <p className="prompt-hint">
        Format: [SectionType | instrument]. Each bracketed section adds ~15 seconds.
      </p>
      <textarea
        value={lyricPrompt}
        onChange={(e) => onLyricPromptChange(e.target.value)}
        className="lyric-textarea"
        rows={10}
        placeholder="[Intro | kalimba hook]&#10;[Verse | ambient pad]&#10;[Chorus | xylophone]&#10;..."
      />
      <div className="prompt-stats">
        <span>
          Lines: {lyricPrompt.split('\n').filter((line) => line.trim()).length}
        </span>
        <span>
          Estimated duration: ~
          {Math.round((lyricPrompt.match(/\[/g) || []).length * 15)} seconds
        </span>
      </div>
    </div>
  );
};

export default LyricPromptEditor;
