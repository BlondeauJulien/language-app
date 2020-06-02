import React, { useContext, useState, useEffect } from 'react';

import HomeHeader from '../components/HomeHeader';
import MainPageContentContainer from '../../shared/components/UIElements/MainPageContentContainer';
import ActionsContainer from '../../shared/components/UIElements/ActionsContainer';
import CardsContainer from '../../shared/components/UIElements/CardsContainer';
import CardsContainerHeader from '../../shared/components/UIElements/CardsContainerHeader';
import Spinner from '../../shared/SVGImages/Spinner';

import CourseContext from '../../context/course/courseContext';

const Home = props => {
  const courseContext = useContext(CourseContext);

  const { authForm, setAuthForm} = props;
  const { getCourses, courses, loading, error, resetCourses } = courseContext;
  const [coursesToDisplay, setCoursesToDisplay] = useState(null);
  useEffect(() => {
    getCourses({userId: '5ea8482a0d76a3170c642b6c'});

    return () => {
      resetCourses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(courses && !error && !loading) {
      setCoursesToDisplay(courses)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ courses, error, loading ]);

  return (
    <div>
      <HomeHeader />
      <MainPageContentContainer mainHome>
        <ActionsContainer 
          authForm={authForm} 
          setAuthForm={setAuthForm} 
          getCourses={getCourses} 
          resetCourses={resetCourses} 
        />
        <CardsContainerHeader title={'Trending Courses'}/>
        { loading && <Spinner /> }
        { error && <p className="form-submit-error-message">{error}</p> }
        {
          coursesToDisplay && (
            <CardsContainer 
              courses={coursesToDisplay}
              postsPerPage={coursesToDisplay.length}
              currentPage={1}
              totalItems={coursesToDisplay.length}
            />
          )
        }
      </MainPageContentContainer>
    </div>
  )
}

export default Home
