import {
  CREATE_COURSE_SUCCESS,
  SET_COURSE_LOADING,
  SET_COURSE_ERROR
} from '../types';

export default (state, action) => {
	switch (action.type) {
    case CREATE_COURSE_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        currentCourse: action.payload,
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
		default:
			return state;
	}
};
