import React from 'react';
import { MusicGeneration } from '../types';
import './GenerationHistory.css';

interface GenerationHistoryProps {
  generations: MusicGeneration[];
  onRatingChange: (id: string, rating: number) => void;
  onDelete: (id: string) => void;
}

const GenerationHistory: React.FC<GenerationHistoryProps> = ({
  generations,
  onRatingChange,
  onDelete,
}) => {
  const renderStars = (generationId: string, currentRating: number = 0) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star ${star <= currentRating ? 'star-filled' : ''}`}
            onClick={() => onRatingChange(generationId, star)}
            aria-label={`Rate ${star} stars`}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  if (generations.length === 0) {
    return (
      <div className="generation-history">
        <h3>Generation History</h3>
        <p className="empty-state">No generations yet. Create your first music!</p>
      </div>
    );
  }

  return (
    <div className="generation-history">
      <h3>Generation History ({generations.length})</h3>
      <div className="generations-list">
        {generations.map((gen) => (
          <div key={gen.id} className="generation-item">
            <div className="generation-header">
              <div>
                <h4>{gen.name}</h4>
                <span className="generation-category">{gen.category}</span>
              </div>
              <button
                type="button"
                onClick={() => onDelete(gen.id)}
                className="delete-btn"
                aria-label="Delete generation"
              >
                🗑️
              </button>
            </div>
            
            <div className="generation-details">
              <div className="tags-display-small">
                <strong>Style:</strong> {gen.styleTags.join(', ')}
              </div>
              {gen.excludeTags.length > 0 && (
                <div className="tags-display-small">
                  <strong>Exclude:</strong> {gen.excludeTags.join(', ')}
                </div>
              )}
              <div className="section-count-display">
                <strong>Sections:</strong> {gen.sections.length} (~
                {gen.sections.length * 15}s)
              </div>
              <div className="generation-date">
                {new Date(gen.generatedAt).toLocaleString()}
              </div>
            </div>
            
            {renderStars(gen.id, gen.rating)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenerationHistory;
