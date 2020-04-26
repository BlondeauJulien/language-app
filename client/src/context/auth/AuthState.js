import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../shared/util/setAuthToken';
import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOG_USER, SET_AUTH_LOADING } from '../types';

const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('auth-token-learnapp'),
		user: null,
		loading: false,
		error: null
  };
  
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const [ state, dispatch ] = useReducer(authReducer, initialState);

	const signup = async form => {
    setLoadingTo(true);
		try {
			const res = await axios.post('/api/users/signup', form, config);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			});
		} catch (err) {
			console.log(err.message);
		}
  };
  
  const signin = async form => {
		setLoadingTo(true);
		try {
			const res = await axios.post('/api/users/login', form, config);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			});
		} catch (err) {
			console.log(err.message);
		}
  };
  
  const logUser = async token => {
    setAuthToken(token);

    try {
			const res = await axios.get('/api/users/loggeduser');
			dispatch({
				type: LOG_USER,
				payload: res.data
			});
		} catch (err) {
			console.log(err.message);
		}
  }

  const setLoadingTo = value => {
    dispatch({
      type: SET_AUTH_LOADING,
      payload: value
    });
  }

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				user: state.user,
				loading: state.loading,
				error: state.error,
        signup,
        signin,
        logUser
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
