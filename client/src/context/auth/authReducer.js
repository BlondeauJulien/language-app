import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOG_USER,
  SET_AUTH_LOADING
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
      case SET_AUTH_LOADING:
        return {
          ...state,
          loading: action.payload
        }
		default:
			return state;
	}
};
