import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import HomeHeader from '../components/HomeHeader';
import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import ActionsContainer from '../../shared/components/UIElements/ActionsContainer';
import CardsContainer from '../../shared/components/UIElements/CardsContainer';
import CardsContainerHeader from '../../shared/components/UIElements/CardsContainerHeader';
import Spinner from '../../shared/SVGImages/Spinner';

import CourseContext from '../../context/course/courseContext';

const Home = props => {
  const courseContext = useContext(CourseContext);
  const history = useHistory();

  const { authForm, setAuthForm} = props;
  const { getCourses, courses, loading, error, currentCourse } = courseContext;
  const [coursesToDisplay, setCoursesToDisplay] = useState(null);

  useEffect(() => {
    getCourses({username: 'julienbbb123456'});
  }, []);

  useEffect(() => {
/*     if(!courses && !error) {
      getCourses({username: 'julienbbb123456'});
    } else {
      setCoursesToDisplay(courses)
    } */
    if(courses && !error && !loading) {
      setCoursesToDisplay(courses)
    }
  }, [ courses, error, loading ]);

  useEffect(() => {
    if(currentCourse) {
      history.push('/course');
    }
  }, [ currentCourse ]);

  return (
    <div>
      <HomeHeader />
      <MainPageContentContainer mainHome>
        <ActionsContainer authForm={authForm} setAuthForm={setAuthForm}/>
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
