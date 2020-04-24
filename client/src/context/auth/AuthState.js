import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
} from '../types';

const AuthState = props => {
  const initialState = {
      token: localStorage.getItem('auth-token-learnapp'),
      user: null,
      loading: false,
      error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);


  return <AuthContext.Provider
  value={{
      token: state.token,
      user: state.user,
      loading: state.loading,
      error: state.error,
  }}
  >
      {props.children}
  </AuthContext.Provider>
}

export default AuthState