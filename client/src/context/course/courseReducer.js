import {
  CREATE_COURSE_SUCCESS,
  SET_COURSE_LOADING,
  SET_COURSE_ERROR,
  RESET_COURSE_SUCCESS,
  GET_COURSES_SUCCESS,
  SELECT_COURSE,
  GET_COURSES_VOCABULARY,
  GET_COURSES_QUIZZES,
  RESET_COURSES
} from '../types';

export default (state, action) => {
	switch (action.type) {
    case CREATE_COURSE_SUCCESS:
      return {
        ...state,
        currentCourse: action.payload,
        isEditMode: false,
        loading: false,
        error: null,
        success: true
      };
    case GET_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload.courses,
        currentCourse: null,
        isEditMode: false,
        loading: false,
        error: null,
        success: null
      };
    case RESET_COURSES:
      return {
        ...state,
        courses: null,
        loading: false,
        error: null,
        success: null
      };
    case SELECT_COURSE:
      return {
        ...state,
        currentCourse: action.payload,
        isEditMode: false,
        loading: false,
        error: null,
        success: null
      };
    case GET_COURSES_VOCABULARY:
      return {
        currentCourse: {...state.currentCourse, vocabulary: action.payload},
        isEditMode: false,
        loading: false,
        error: null,
        success: null
      };
    case GET_COURSES_QUIZZES:
      return {
        currentCourse: {...state.currentCourse, quizzes: action.payload},
        isEditMode: false,
        loading: false,
        error: null,
        success: null
      };
    case SET_COURSE_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_COURSE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case RESET_COURSE_SUCCESS:
      return {
        ...state,
        success: null
      }
		default:
			return state;
	}
};
