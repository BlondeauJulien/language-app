import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
    REGISTER_SUCCESS
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('auth-token-learnapp'),
    user: null,
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const signup = async form => {
    //ADD LOADING
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/users/signup', form , config );
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
    
    } catch (err) {
        console.log(err.message)
    }
  }


  return <AuthContext.Provider
  value={{
      token: state.token,
      user: state.user,
      loading: state.loading,
      error: state.error,
      signup
  }}
  >
      {props.children}
  </AuthContext.Provider>
}

export default AuthState