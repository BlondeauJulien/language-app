import {
  CREATE_COURSE_SUCCESS,
  SET_COURSE_LOADING,
  SET_COURSE_ERROR,
  RESET_COURSE_SUCCESS,
  GET_COURSES_SUCCESS,
  SELECT_COURSE,
  GET_COURSES_VOCABULARY,
  GET_COURSES_QUIZZES,
  RESET_COURSES,
  DELETE_COURSES_SUCCESS,
  SET_COURSE_EDIT,
  EDIT_COURSES_SUCCESS,
  CREATE_VOCABULARY
} from '../types';

export default (state, action) => {
	switch (action.type) {
    case CREATE_COURSE_SUCCESS:
      return {
        ...state,
        currentCourse: action.payload,
        courseToEdit: null,
        loading: false,
        error: null,
        success: true
      };
    case GET_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload.courses,
        currentCourse: null,
        courseToEdit: null,
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
        loading: false,
        error: null,
        success: null
      };
    case SET_COURSE_EDIT:
      return {
        ...state,
        currentCourse: null,
        courseToEdit: action.payload,
        loading: false,
        error: null,
        success: null
      };
    case EDIT_COURSES_SUCCESS:
      return {
        ...state,
        currentCourse: action.payload,
        courseToEdit: null,
        loading: false,
        error: null,
        success: true
      };
    case DELETE_COURSES_SUCCESS:
      return {
        ...state,
        currentCourse: null,
        courseToEdit: null,
        loading: false,
        error: null,
        success: action.payload
      };
    case GET_COURSES_VOCABULARY:
      return {
        ...state,
        currentCourse: {...state.currentCourse, vocabulary: action.payload},
        courseToEdit: null,
        loading: false,
        error: null,
        success: null
      };
    case CREATE_VOCABULARY:
      return {
        ...state,
        currentCourse: {...state.currentCourse, vocabulary: [...state.currentCourse.vocabulary, action.payload]},
        currentVocabulary: action.payload,
        courseToEdit: null,
        loading: false,
        error: null,
        success: true
      };
    case GET_COURSES_QUIZZES:
      return {
        ...state,
        currentCourse: {...state.currentCourse, quizzes: action.payload},
        courseToEdit: null,
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
