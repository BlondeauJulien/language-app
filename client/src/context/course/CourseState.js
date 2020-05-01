import React, { useReducer } from 'react';
import axios from 'axios';
import CourseContext from './courseContext';
import courseReducer from './courseReducer';
import setAuthToken from '../../shared/util/setAuthToken';
import {
  CREATE_COURSE_SUCCESS,
  SET_COURSE_LOADING,
  SET_COURSE_ERROR
} from '../types';

const CourseState = (props) => {
	const initialState = {
    courses: null,
    currentCourse: null,
    isEditMode: false,
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
    //setLoadingTo(true);
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

	return (
		<CourseContext.Provider
			value={{
        courses: state.courses,
        currentCourse: state.currentCourse,
        isEditMode: state.isEditMode,
        loading: state.loading,
        error: state.error,
        success: state.success,
        createCourse
			}}
		>
			{props.children}
		</CourseContext.Provider>
	);
};

export default CourseState;
