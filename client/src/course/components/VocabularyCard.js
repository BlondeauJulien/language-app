import React, { useState } from 'react';

import Button from '../../shared/components/FormElements/Button';

import './VocabularyCard.css';

const VocabularyCard = () => {
  const [flip, setFlip] = useState(false);

  return (
    <div className="vocabulary-card-container">
      <div 
        className={`vocabulary-card ${flip ? 'flip' : ''}`}
        onClick={() => setFlip(!flip)}
      >
        <div className="vocabulary-card-front">
          <div className="vocabulary-card-content">some vocabulary and more and more</div>
        </div>
        <div className="vocabulary-card-back">
          <div className="vocabulary-card-content">Here is the translation</div>
        </div>
      </div>
      
      <Button type={'button'} design={'plain-text'} >See whole card</Button>
    </div>

  )
}

export default VocabularyCard
