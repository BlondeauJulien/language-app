import React, { useContext, useState, useEffect } from 'react';

import HomeHeader from '../components/HomeHeader';
import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import ActionsContainer from '../../shared/components/UIElements/ActionsContainer';
import CardsContainer from '../../shared/components/UIElements/CardsContainer';
import CardsContainerHeader from '../../shared/components/UIElements/CardsContainerHeader';
import Spinner from '../../shared/SVGImages/Spinner';

import CourseContext from '../../context/course/courseContext';

const Home = () => {
  const courseContext = useContext(CourseContext);

  const { getCourses, courses, loading, error } = courseContext;
  const [coursesToDisplay, setCoursesToDisplay] = useState(null);

  useEffect(() => {
    if(!courses && !error) {
      getCourses();
    } else {
      setCoursesToDisplay(courses)
    }
  }, [ courses, error ])

  return (
    <div>
      <HomeHeader />
      <MainPageContentContainer mainHome>
        <ActionsContainer />
        <CardsContainerHeader title={'Trending Courses'}/>
        { loading && <Spinner /> }
        { error && <p>{error}</p> }
        {
          coursesToDisplay && (
            <CardsContainer courses={coursesToDisplay}/>
          )
        }
      </MainPageContentContainer>
    </div>
  )
}

export default Home
