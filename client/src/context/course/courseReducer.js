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
  CREATE_VOCABULARY,
  SELECT_VOCABULARY,
  SET_VOCABULARY_EDIT,
  EDIT_VOCABULARY_SUCCESS,
  DELETE_VOCABULARY_SUCCESS,
  CREATE_QUIZ,
  SELECT_QUIZ,
  SET_QUIZ_EDIT,
  EDIT_QUIZ_SUCCESS,
  DELETE_QUIZ_SUCCESS,
  SET_SHOW_UNAPPROVED_IMAGE,
  SET_VOCABULARY_SEARCH,
  SET_QUIZ_SEARCH
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
    case SELECT_VOCABULARY:
    case EDIT_VOCABULARY_SUCCESS:
      return {
        ...state,
        currentVocabulary: action.payload,
        currentQuiz: null,
        courseToEdit: null,
        loading: false,
        error: null,
        success: null
      };
    case SET_VOCABULARY_EDIT:
      let currentVoc = {...state.currentVocabulary}
      return {
        ...state,
        currentVocabulary: action.payload || Object.keys(currentVoc).length === 0 ? null : currentVoc,
        courseToEdit: null,
        vocabularyToEdit: action.payload,
        loading: false,
        error: null,
        success: null
      };
    case DELETE_VOCABULARY_SUCCESS: 
      return {
        ...state,
        currentCourse: {
          ...state.currentCourse, 
          vocabulary: [...state.currentCourse.vocabulary].filter(v => v._id !== action.payload.vocId)
        },
        currentVocabulary: null,
        courseToEdit: null,
        loading: false,
        error: null,
        success: {message: action.payload.message, for: 'delete'} 
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
    case CREATE_QUIZ:
      return {
        ...state,
        currentCourse: {...state.currentCourse, quizzes: [...state.currentCourse.quizzes, action.payload]},
        currentVocabulary: null,
        currentQuiz: action.payload,
        courseToEdit: null,
        loading: false,
        error: null,
        success: true
      };
    case SELECT_QUIZ:
    case EDIT_QUIZ_SUCCESS:
      return {
        ...state,
        currentVocabulary: null,
        currentQuiz: action.payload,
        courseToEdit: null,
        loading: false,
        error: null,
        success: null
      };
    case SET_QUIZ_EDIT:
      let currentQuiz = {...state.currentQuiz}
      return {
        ...state,
        currentQuiz: action.payload || Object.keys(currentQuiz).length === 0 ? null : currentQuiz,
        courseToEdit: null,
        quizToEdit: action.payload,
        loading: false,
        error: null,
        success: null
      };
    case DELETE_QUIZ_SUCCESS:
      return {
        ...state,
        currentCourse: {
          ...state.currentCourse, 
          quizzes: [...state.currentCourse.quizzes].filter(v => v._id !== action.payload.quizId)
        },
        currentVocabulary: null,
        currentQuiz: null,
        courseToEdit: null,
        loading: false,
        error: null,
        success: {message: action.payload.message, for: 'delete'} 
      };
    case SET_VOCABULARY_SEARCH:
      return {
        ...state,
        searchVocabulary: {...state.searchVocabulary, ...action.payload},
        loading: false,
        error: null,
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
      };
    case SET_SHOW_UNAPPROVED_IMAGE:
      return {
        ...state,
        alwaysDisplayUnapprovedImage: action.payload
      };
		default:
			return state;
	}
};
