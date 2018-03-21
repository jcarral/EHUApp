import { START_LOADING, SUBJECT_ERROR, SUBJECT_FETCH } from './subject.types';

const initialState = {
	subject: {},
	searching: true,
	error: false
};

export const subjectReducer = (state = initialState, action) => {
	console.log(action.type, action.payload);

	switch (action.type) {
		case START_LOADING:
			return {
				...state,
				searching: true,
				error: false
			};
		case SUBJECT_ERROR:
			return {
				...state,
				error: true,
				searching: false
			};
		case SUBJECT_FETCH:
			return {
				...state,
				searching: false,
				error: false,
				subject: action.payload
			};
		default:
			return state;
	}
};
