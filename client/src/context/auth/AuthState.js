import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../shared/util/setAuthToken';
import {
	REGISTER_SUCCESS,
	LOGIN_SUCCESS,
	LOG_USER,
	SET_AUTH_LOADING,
	LOGOUT,
	SET_AUTH_ERROR,
	DELETE_USER,
	EDIT_USER,
	BAN_USER_SUCCESS,
	RESET_SUCCESS,
	SET_USER_COURSES,
	CLEAR_USER_COURSES,
	SET_USERS,
	APPROVE_QUIZ_SUCCESS
} from '../types';

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('auth-token-learnapp'),
		user: null,
		loading: false,
		error: null,
		success: null
	};

	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

	const [ state, dispatch ] = useReducer(authReducer, initialState);

	const signup = async (form) => {
		setLoadingTo(true);
		try {
			const res = await axios.post('/api/users/signup', form, config);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			});
		} catch (err) {
			setAuthError(err.response.data.message);
		}
	};

	const signin = async (form) => {
		setLoadingTo(true);
		try {
			const res = await axios.post('/api/users/login', form, config);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			});
		} catch (err) {
			setAuthError(err.response.data.message);
		}
	};

	const logUser = async (token) => {
		setAuthToken(token);

		try {
			const res = await axios.get('/api/users/loggeduser');
			dispatch({
				type: LOG_USER,
				payload: res.data
			});
		} catch (err) {
			console.log('An error occured while auto login');
		}
	};

	const setAuthError = (value) => {
		dispatch({
			type: SET_AUTH_ERROR,
			payload: value
		});
	};

	const logout = () => {
		dispatch({
			type: LOGOUT
		});
	};

	const editProfile = async (form) => {
		setAuthToken(state.token);

		try {
			const res = await axios.patch(`/api/users/${state.user.id}`, form, config);
			dispatch({
				type: EDIT_USER,
				payload: res.data
			});
		} catch (err) {
			setAuthError(err.response.data.message);
		}
	};

	const deleteUser = async (form) => {
		setAuthToken(state.token);
		const configDelete = {
			...config,
			data: form
		};
		try {
			const res = await axios.delete(`/api/users/${state.user.id}`, configDelete);
			dispatch({
				type: DELETE_USER,
				payload: res.data
			});
		} catch (err) {
			setAuthError(err.response.data.message);
		}
	};

	const getUserCourses = async userId => {
		setLoadingTo(true);
		try {
			const res = await axios.get(`/api/users/${userId}/courses`);
			dispatch({
				type: SET_USER_COURSES,
				payload: res.data
			});
		} catch (err) {
			setAuthError(err.response.data.message);
		}
	}

	const clearUserCourses = () => {
		dispatch({
			type: CLEAR_USER_COURSES
		});
	}

	const getUsers = async () => {
		setLoadingTo(true);
		setAuthToken(state.token);
		try {
			const res = await axios.get(`/api/users`);
			dispatch({
				type: SET_USERS,
				payload: res.data
			});
		} catch (err) {
			setAuthError(err.response.data.message);
		}
	}

	const banUser = async (userId, userToken, password, courseId, quizId) => {
    setAuthToken(userToken)
		setLoadingTo(true);
		
		try {
			if(courseId) {
				const course = await axios.get(`/api/courses/${courseId}`);
				userId = course.data.course.creator._id
			}
			const res = await axios.patch(`/api/users/${userId}/status`, {status: 'banned', password}, config);

			dispatch({
				type: BAN_USER_SUCCESS,
				payload: {
					message: res.data.message,
					quizId,
					userId
        }
			});
		} catch (err) {
			setAuthError(err.response.data.message);
		}
	}

	const approveQuizImage = async (quizId, userToken) => {
    setAuthToken(userToken)
    setLoadingTo(true);
    try {
      const res = await axios.patch(`/api/quizzes/${quizId}/approve`);
			dispatch({
				type: APPROVE_QUIZ_SUCCESS,
				payload: {
          message: res.data.message,
          quizId
        }
			});
		} catch (err) {
			setAuthError(err.response.data.message);
		}
  }

	const setLoadingTo = value => {
		dispatch({
			type: SET_AUTH_LOADING,
			payload: value
		});
	};

	const resetSuccess = () => {
		dispatch({
			type: RESET_SUCCESS
		});
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				user: state.user,
				loading: state.loading,
				error: state.error,
				success: state.success,
				signup,
				signin,
				logUser,
				logout,
				editProfile,
				deleteUser,
				banUser,
				setAuthError,
				resetSuccess,
				getUserCourses,
				clearUserCourses,
				getUsers,
				approveQuizImage
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
