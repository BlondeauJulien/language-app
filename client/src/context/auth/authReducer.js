import {
	REGISTER_SUCCESS
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case REGISTER_SUCCESS:
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
			}
		default:
			return state;
	}
};
