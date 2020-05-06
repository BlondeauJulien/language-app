import React, { useReducer } from 'react';
import axios from 'axios';
import CourseContext from './courseContext';
import courseReducer from './courseReducer';
import setAuthToken from '../../shared/util/setAuthToken';
import createQueriesString from '../util/createQueryString';
import {
  CREATE_COURSE_SUCCESS,
  SET_COURSE_LOADING,
  SET_COURSE_ERROR,
  RESET_COURSE_SUCCESS,
  GET_COURSES_SUCCESS,
  SELECT_COURSE,
  GET_COURSES_VOCABULARY,
  GET_COURSES_QUIZZES,
  RESET_COURSES,
  DELETE_COURSES_SUCCESS,
  SET_COURSE_EDIT,
  EDIT_COURSES_SUCCESS
} from '../types';

const CourseState = (props) => {
	const initialState = {
    courses: null,
    currentCourse: null,
    courseToEdit: null,
    loading: false,
    error: null,
    success: null
	};

	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

  const [ state, dispatch ] = useReducer(courseReducer, initialState);
  
  const createCourse = async (formData, creatorToken) => {
    setLoadingTo(true);
    setAuthToken(creatorToken)
		try {
			const res = await axios.post('/api/courses', formData, config);
			dispatch({
				type: CREATE_COURSE_SUCCESS,
				payload: res.data
			});
		} catch (err) {
			setCourseError(err.response.data.message);
		}
  }

  const getCourses = async (queries = {}) => {
    setLoadingTo(true);
    const queriesString = createQueriesString(queries);
    try {
      const res = await axios.get(`/api/courses${queriesString}`);
			dispatch({
				type: GET_COURSES_SUCCESS,
				payload: res.data
			});
		} catch (err) {
			setCourseError(err.response.data.message);
		}
  }

  const resetCourses = () => {
    dispatch({
      type: RESET_COURSES
    });
  }

  const selectCourse = courseId => {
    // Call this function withou param to reset selected course to null
    let course = null;
    if(courseId) {
      course = state.courses.find(course => course._id === courseId);
    }
    dispatch({
      type: SELECT_COURSE,
      payload: course
    });
  }

  const setCourseToEdit = course => {
    dispatch({
      type: SET_COURSE_EDIT,
      payload: course
    });
  }

  const editCourse = async (courseId, formData, userToken) => {
    setAuthToken(userToken);
    setLoadingTo(true);
    try {
      const res = await axios.patch(`/api/courses/${courseId}`, formData, config);
			dispatch({
				type: EDIT_COURSES_SUCCESS,
				payload: res.data
			});
		} catch (err) {
			setCourseError(err.response.data.message);
		}
  }

  const deleteCourse = async (courseId, userToken) => {
    setAuthToken(userToken)
    try {
      const res = await axios.delete(`/api/courses/${courseId}`);
			dispatch({
				type: DELETE_COURSES_SUCCESS,
				payload: res.data
			});
		} catch (err) {
			setCourseError(err.response.data.message);
		}
  }

  const getCourseVocabulary = async courseId => {
    setLoadingTo(true);
    try {
      const res = await axios.get(`/api/courses/${courseId}/vocabulary`);
			dispatch({
				type: GET_COURSES_VOCABULARY,
				payload: res.data.course.vocabulary
			});
		} catch (err) {
			setCourseError(err.response.data.message);
		}
  }

  const getCourseQuizzes = async courseId => {
    setLoadingTo(true);
    try {
      const res = await axios.get(`/api/courses/${courseId}/quizzes`);
			dispatch({
				type: GET_COURSES_QUIZZES,
				payload: res.data.course.quizzes
			});
		} catch (err) {
			setCourseError(err.response.data.message);
		}
  }

  const setLoadingTo = value => {
    dispatch({
			type: SET_COURSE_LOADING,
			payload: value
		});
  }

  const setCourseError = errorMessage => {
		dispatch({
			type: SET_COURSE_ERROR,
			payload: errorMessage
		});
  }

	const resetCourseSuccess = () => {
		dispatch({
			type: RESET_COURSE_SUCCESS
		});
	};

	return (
		<CourseContext.Provider
			value={{
        courses: state.courses,
        currentCourse: state.currentCourse,
        courseToEdit: state.courseToEdit,
        loading: state.loading,
        error: state.error,
        success: state.success,
        createCourse,
        resetCourseSuccess,
        getCourses,
        selectCourse,
        getCourseVocabulary,
        getCourseQuizzes,
        resetCourses,
        deleteCourse,
        setCourseToEdit,
        editCourse
			}}
		>
			{props.children}
		</CourseContext.Provider>
	);
};

export default CourseState;
