import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOG_USER,
  SET_AUTH_LOADING,
  LOGOUT,
  SET_AUTH_ERROR,
  DELETE_USER
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case LOG_USER:
      localStorage.setItem('token', action.payload.token);
			return {
				...state,
				token: action.payload.token,
				user: {
					id: action.payload.userId,
					username: action.payload.username,
					email: action.payload.email,
				},
				loading: false,
				error: null
      };
      case LOGOUT:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          user: null,
          loading: false,
          error: null
        };
      case DELETE_USER:
        localStorage.removeItem('token');
        alert(action.payload.message);
        return {
          ...state,
          token: null,
          user: null,
          loading: false,
          error: null
        };
      case SET_AUTH_LOADING:
        return {
          ...state,
          loading: action.payload
        };
      case SET_AUTH_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
		default:
			return state;
	}
};
