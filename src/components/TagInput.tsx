import React from 'react';
import './TagInput.css';

interface TagInputProps {
  label: string;
  tags: string[];
  suggestions: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
}

const TagInput: React.FC<TagInputProps> = ({
  label,
  tags,
  suggestions,
  onTagsChange,
  placeholder = 'Type and press Enter to add tags',
}) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        onTagsChange([...tags, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const addSuggestion = (suggestion: string) => {
    if (!tags.includes(suggestion)) {
      onTagsChange([...tags, suggestion]);
    }
  };

  return (
    <div className="tag-input-container">
      <label>{label}</label>
      <div className="tag-input-wrapper">
        <div className="tags-display">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
              <button
                type="button"
                className="tag-remove"
                onClick={() => removeTag(tag)}
                aria-label={`Remove ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="tag-input"
        />
      </div>
      {suggestions.length > 0 && (
        <div className="tag-suggestions">
          <span className="suggestions-label">Suggestions: </span>
          {suggestions
            .filter((suggestion) => !tags.includes(suggestion))
            .map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="suggestion-tag"
                onClick={() => addSuggestion(suggestion)}
              >
                + {suggestion}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;
