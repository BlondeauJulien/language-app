import React, { useReducer } from 'react';
import axios from 'axios';
import CourseContext from './courseContext';
import courseReducer from './courseReducer';
import setAuthToken from '../../shared/util/setAuthToken';
import {

} from '../types';

const CourseState = (props) => {
	const initialState = {

	};

	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const [ state, dispatch ] = useReducer(courseReducer, initialState);

	return (
		<CourseContext.Provider
			value={{
        courses: null,
        currentCourse: null,
        loading: false,
        error: null,
        success: null
			}}
		>
			{props.children}
		</CourseContext.Provider>
	);
};

export default CourseState;
