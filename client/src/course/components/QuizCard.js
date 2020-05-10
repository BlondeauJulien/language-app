import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import CourseContext from '../../context/course/courseContext';

import './QuizCard.css';

const QuizCard = props => {
  const { quiz } = props;

  const courseContext = useContext(CourseContext);
  const history = useHistory();

  const { selectQuiz, currentQuiz } = courseContext;

  useEffect(() => {
    if(currentQuiz) {
      history.push('/quiz');
    }
  }, [currentQuiz])

  useEffect(() => {
    const imageEl = document.getElementById(quiz._id);
    const imgNaturalWith = document.getElementById(quiz._id).naturalWidth;
    const imgNaturalHeight = document.getElementById(quiz._id).naturalHeight;

    if(imgNaturalWith < imgNaturalHeight) {
      imageEl.classList.add('img-full-width');
    } else {
      imageEl.classList.add('img-full-height');
    }

    const handleHoverImage = e => {
      if(e.target.id === quiz._id) {
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
      if(e.target.id === quiz._id) {
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

  const onSelectQuiz = () => {
    selectQuiz(quiz);
  }

	return (
    <div className="quiz-card" onClick={onSelectQuiz}>
      <img className="image-card" id={quiz._id} src={quiz.image} />
    </div>
	);
};

export default QuizCard;
