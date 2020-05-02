import React from 'react';

import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import CourseCard from '../../shared/components/UIElements/CourseCard';
import CourseContentSearcForm from '../components/CourseContentSearchForm';
import CardsContainer from '../../shared/components/UIElements/CardsContainer';
import QuizCard from '../components/QuizCard';

import './Course.css';

const Course = () => {
  const course = {
    name: 'Learn Norwegian colours',
    countryFlag: 'NO',
    language: 'Norwegian',
    learningFrom: 'French',
    creator: {
      username: 'julien'
    }
  }

  const words = [{
    word: 'This is a word',
    translation: 'This is the translation'
    }, {
    word: 'This is a word',
    translation: 'This is the translation'
    },{
    word: 'This is a word',
    translation: 'This is the translation'
    },{
    word: 'This is a word',
    translation: 'This is the translation'
    }, {
    word: 'This is a word',
    translation: 'This is the translation'
    },{
    word: 'This is a word',
    translation: 'This is the translation'
    }
  ];

  const quizzes = [
    {
      id: 'quiz-image-1',
      image: 'https://images.radio-canada.ca/q_auto,w_960/v1/ici-premiere/16x9/forrest-gump-pluson.jpg'
    },
    {
      id: 'quiz-image-2',
      image: 'https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg'
    },
    {
      id: 'quiz-image-3',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR5GSkLSgX4RpEQF6vioLT7i2pv-TyRx2bIXeuaYTSpfgaPWsrd&usqp=CAU'
    },
    {
      id: 'quiz-image-4',
      image: 'https://lokeshdhakar.com/projects/lightbox2/images/image-5.jpg'
    },
    {
      id: 'quiz-image-5',
      image: 'https://images.radio-canada.ca/q_auto,w_960/v1/ici-premiere/16x9/forrest-gump-pluson.jpg'
    },
    {
      id: 'quiz-image-6',
      image: 'https://images.radio-canada.ca/q_auto,w_960/v1/ici-premiere/16x9/forrest-gump-pluson.jpg'
    },
    {
      id: 'quiz-image-7',
      image: 'https://images.radio-canada.ca/q_auto,w_960/v1/ici-premiere/16x9/forrest-gump-pluson.jpg'
    },

  ]

  return (
    <MainPageContentContainer>
      <div className="course-page-header">
        <CourseCard course={course}/>
        <CourseContentSearcForm />
      </div>
      {/* <CardsContainer words={words}/> */}
      {/* <CardsContainer quizzes={quizzes}/> */}
    </MainPageContentContainer>
  )
}

export default Course
