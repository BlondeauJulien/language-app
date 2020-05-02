import {
  CREATE_COURSE_SUCCESS,
  SET_COURSE_LOADING,
  SET_COURSE_ERROR,
  RESET_COURSE_SUCCESS
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
