import React, { useEffect } from 'react';

import './QuizCard.css';

const QuizCard = props => {
  useEffect(() => {
    const imageEl = document.getElementById(props.quiz._id);
    const imgNaturalWith = document.getElementById(props.quiz._id).naturalWidth;
    const imgNaturalHeight = document.getElementById(props.quiz._id).naturalHeight;

    if(imgNaturalWith < imgNaturalHeight) {
      imageEl.classList.add('img-full-width');
    } else {
      imageEl.classList.add('img-full-height');
    }

    const handleHoverImage = e => {
      if(e.target.id === props.quiz._id) {
        if(imgNaturalWith < imgNaturalHeight) {
          imageEl.classList.remove('image-card', 'img-full-width');
          imageEl.classList.add('resize-by-height')
        } else {
          imageEl.classList.remove('image-card', 'img-full-height');
          imageEl.classList.add('resize-by-width')
        }
      }
    }

    const handleLeaveImageHover = e => {
      if(e.target.id === props.quiz._id) {
        if(imgNaturalWith < imgNaturalHeight) {
          imageEl.classList.add('image-card', 'img-full-width');
          imageEl.classList.remove('resize-by-height')
        } else {
          imageEl.classList.add('image-card', 'img-full-height');
          imageEl.classList.remove('resize-by-width')
        }
      }
    }

    window.addEventListener('mouseover', handleHoverImage);
    window.addEventListener('mouseout', handleLeaveImageHover);

    return () => {
      window.removeEventListener('mouseover', handleHoverImage);
      window.removeEventListener('mouseout', handleLeaveImageHover);
    }
  })



	return (
    <div className="quiz-card">
      <img className="image-card" id={props.quiz._id} src={props.quiz.image} />
    </div>
	);
};

export default QuizCard;
