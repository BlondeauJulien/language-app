import React, { useReducer } from 'react';
import axios from 'axios';
import CourseContext from './courseContext';
import courseReducer from './courseReducer';
import setAuthToken from '../../shared/util/setAuthToken';
import createQueriesString from '../util/createQueryString';
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
  CLEAR_COURSE_EDIT,
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
  SET_QUIZ_SEARCH,
  CLEAR_SEARCH_CONTENT,
} from '../types';

const CourseState = (props) => {
	const initialState = {
    courses: null,
    currentCourse: null,
    currentVocabulary: null,
    currentQuiz: null,
    courseToEdit: null,
    vocabularyToEdit: null,
    quizToEdit: null,
    loading: false,
    error: null,
    success: null,
    alwaysDisplayUnapprovedImage: false,
    searchVocabulary: {
			word: '',
			translation: '',
			difficultyLevel: '',
			tags: ''
    },
    searchQuiz: {
      difficultyLevel: '',
			tags: ''
    }
	};

	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};

  const [ state, dispatch ] = useReducer(courseReducer, initialState);
  
  const createCourse = async (formData, creatorToken) => {
    setLoadingTo(true);
    setAuthToken(creatorToken)
		try {
			const res = await axios.post('/api/courses', formData, config);
			dispatch({
				type: CREATE_COURSE_SUCCESS,
				payload: res.data
			});
		} catch (err) {
			setCourseError(err.response.data.message);
		}
  }

  const getCourses = async (queries = {}) => {
    setLoadingTo(true);
    const queriesString = createQueriesString(queries);
    try {
      const res = await axios.get(`/api/courses${queriesString}`);
			dispatch({
				type: GET_COURSES_SUCCESS,
				payload: res.data
			});
		} catch (err) {
			setCourseError(err.response.data.message);
		}
  }

  const resetCourses = () => {
    dispatch({
      type: RESET_COURSES
    });
  }

  const selectCourse = (course = null) => {
    // Call this function without param to reset selected course to null
    dispatch({
      type: SELECT_COURSE,
      payload: course
    });
  }

  const setCourseToEdit = course => {
    dispatch({
      type: SET_COURSE_EDIT,
      payload: course
    });
  }

  const clearCourseToEdit = () => {
    dispatch({
      type: CLEAR_COURSE_EDIT,
    });
  }

  const editCourse = async (courseId, formData, userToken) => {
    setAuthToken(userToken);
    setLoadingTo(true);
    try {
      const res = await axios.patch(`/api/courses/${courseId}`, formData, config);
			dispatch({
				type: EDIT_COURSES_SUCCESS,
				payload: res.data
			});
		} catch (err) {
			setCourseError(err.response.data.message);
		}
  }

  const deleteCourse = async (courseId, userToken) => {
    setAuthToken(userToken)
    try {
      const res = await axios.delete(`/api/courses/${courseId}`);
			dispatch({
				type: DELETE_COURSES_SUCCESS,
				payload: res.data
			});
		} catch (err) {
			setCourseError(err.response.data.message);
		}
  }

  const getCourseVocabulary = async courseId => {
    setLoadingTo(true);
    try {
      const res = await axios.get(`/api/courses/${courseId}/vocabulary`);
			dispatch({
				type: GET_COURSES_VOCABULARY,
				payload: res.data.course.vocabulary
			});
		} catch (err) {
			setCourseError(err.response.data.message);
		}
  }

  const createVocabulary = async (formData, userToken) => {
    setAuthToken(userToken)
    try {
      const res = await axios.post(`/api/vocabulary`, formData, config);
			dispatch({
				type: CREATE_VOCABULARY,
				payload: res.data
			});
		} catch (err) {
			setCourseError(err.response.data.message);
		}
  }

  const selectVocabulary = word => {
    dispatch({
      type: SELECT_VOCABULARY,
      payload: word
    })
  }

  const setWordToEdit = word => {
    dispatch({
      type: SET_VOCABULARY_EDIT,
      payload: word
    });
  }

  const editVocabulary = async (vocabID, formData, userToken) => {
    setAuthToken(userToken);
    setLoadingTo(true);
    try {
      const res = await axios.patch(`/api/vocabulary/${vocabID}`, formData, config);
 			dispatch({
        type: EDIT_VOCABULARY_SUCCESS,
				payload: res.data
			}); 
		} catch (err) {
			setCourseError(err.response.data.message);
		}
  }

  const deleteVocabulary = async (vocId, userToken) => {
    setAuthToken(userToken)
    setLoadingTo(true);
    try {
      const res = await axios.delete(`/api/vocabulary/${vocId}`);
			dispatch({
				type: DELETE_VOCABULARY_SUCCESS,
				payload: {
          message: res.data.message,
          vocId
        }
			});
		} catch (err) {
			setCourseError(err.response.data.message);
		}
  }

  const getCourseQuizzes = async courseId => {
    setLoadingTo(true);
    try {
      const res = await axios.get(`/api/courses/${courseId}/quizzes`);
			dispatch({
				type: GET_COURSES_QUIZZES,
				payload: res.data.course.quizzes
			});
		} catch (err) {
			setCourseError(err.response.data.message);
		}
  }

  const createQuiz = async (formData, userToken) => {
    setAuthToken(userToken)
    try {
      const res = await axios.post(`/api/quizzes`, formData, config);
			dispatch({
				type: CREATE_QUIZ,
				payload: res.data
			});
		} catch (err) {
			setCourseError(err.response.data.message);
		}
  }

  const selectQuiz = quiz => {
    dispatch({
      type: SELECT_QUIZ,
      payload: quiz
    })
  }

  const setQuizToEdit = quiz => {
    dispatch({
      type: SET_QUIZ_EDIT,
      payload: quiz
    });
  }

  const editQuiz = async (quizID, formData, userToken) => {
    setAuthToken(userToken);
    setLoadingTo(true);
    try {
      const res = await axios.patch(`/api/quizzes/${quizID}`, formData, config);
 			dispatch({
        type: EDIT_QUIZ_SUCCESS,
				payload: res.data
			}); 
		} catch (err) {
			setCourseError(err.response.data.message);
		}
  }

  const deleteQuiz = async (quizId, userToken) => {
    setAuthToken(userToken)
    setLoadingTo(true);
    try {
      const res = await axios.delete(`/api/quizzes/${quizId}`);
			dispatch({
				type: DELETE_QUIZ_SUCCESS,
				payload: {
          message: res.data.message,
          quizId
        }
			});
		} catch (err) {
			setCourseError(err.response.data.message);
		}
  }

  const setSearchContent = (form, contentType) => {
    let type = contentType === 'word' ? SET_VOCABULARY_SEARCH : SET_QUIZ_SEARCH
    dispatch({
			type,
			payload: form
		});
  }

  const clearSearchContent = () => {
    dispatch({
			type: CLEAR_SEARCH_CONTENT,
			payload: {
        searchVocabulary: {
          word: '',
          translation: '',
          difficultyLevel: '',
          tags: ''
        },
        searchQuiz: {
          difficultyLevel: '',
          tags: ''
        }
      }
		});
  }

  const setLoadingTo = value => {
    dispatch({
			type: SET_COURSE_LOADING,
			payload: value
		});
  }

  const setCourseError = errorMessage => {
		dispatch({
			type: SET_COURSE_ERROR,
			payload: errorMessage
		});
  }

	const resetCourseSuccess = () => {
		dispatch({
			type: RESET_COURSE_SUCCESS
		});
  };
  
  const setAlwaysShowUnapprovedImage = () => {

    dispatch({
      type: SET_SHOW_UNAPPROVED_IMAGE,
      payload: true
		});
  }

	return (
		<CourseContext.Provider
			value={{
        courses: state.courses,
        currentCourse: state.currentCourse,
        currentVocabulary: state.currentVocabulary,
        currentQuiz: state.currentQuiz,
        courseToEdit: state.courseToEdit,
        vocabularyToEdit: state.vocabularyToEdit,
        quizToEdit: state.quizToEdit,
        loading: state.loading,
        error: state.error,
        success: state.success,
        alwaysDisplayUnapprovedImage: state.alwaysDisplayUnapprovedImage,
        searchVocabulary: state.searchVocabulary,
        searchQuiz: state.searchQuiz,
        createCourse,
        resetCourseSuccess,
        getCourses,
        selectCourse,
        getCourseVocabulary,
        getCourseQuizzes,
        resetCourses,
        deleteCourse,
        setCourseToEdit,
        clearCourseToEdit,
        editCourse,
        createVocabulary,
        selectVocabulary,
        setWordToEdit,
        editVocabulary,
        deleteVocabulary,
        setCourseError,
        createQuiz,
        selectQuiz,
        setQuizToEdit,
        editQuiz,
        deleteQuiz,
        setAlwaysShowUnapprovedImage,
        setSearchContent,
        clearSearchContent
			}}
		>
			{props.children}
		</CourseContext.Provider>
	);
};

export default CourseState;
