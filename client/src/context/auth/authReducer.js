import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOG_USER,
  SET_AUTH_LOADING,
  LOGOUT,
  SET_AUTH_ERROR,
  DELETE_USER,
  EDIT_USER,
  RESET_SUCCESS,
  CLEAR_USER_COURSES,
  SET_USER_COURSES,
  SET_USERS
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
          ...action.payload.role && { role: action.payload.role },
          ...action.payload.imageToReview && { imageToReview: action.payload.imageToReview }
				},
				loading: false,
				error: null
      };
    case EDIT_USER:
      return {
        ...state,
        user: {
          id: action.payload.userId,
          username: action.payload.username,
          email: action.payload.email,
          ...action.payload.role && { role: action.payload.role },
          ...action.payload.imageToReview && { imageToReview: action.payload.imageToReview }
        },
        loading: false,
        error: null,
        success: 'edit-profile'
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
    case SET_USER_COURSES:
      return {
        ...state,
        user: {
          ...state.user,
          courses: [
            ...action.payload.user.courseCreated,
          ].map(c => {
            return {...c, creator: {_id: state.user.id, username: state.user.username }}
          })
        },
        loading: false,
        error: null
      };
    case CLEAR_USER_COURSES:
      const userInfos = {...state.user};
      delete userInfos.courses;
      return {
        ...state,
        user: state.user ? userInfos : null,
        loading: false,
        error: null
      };
    case SET_USERS:
      return {
        ...state,
        user: {
          ...state.user,
          users: [
            ...action.payload.users,
          ]
        },
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
    case RESET_SUCCESS:
      return {
        ...state,
        success: null
      };
		default:
			return state;
	}
};
