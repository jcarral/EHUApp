import { START_SEARCHING, TEACHER_SEARCHING, TEACHER_ERROR, TEACHER_FETCH } from './teacher.types';

const initialState = {
	teacher : {},
	searching : false,
	teacherData : {},
	error: false
};

export const teacherReducer = (state = initialState, action) => {
	console.log(action.type, action.payload);
	switch(action.type){
		case START_SEARCHING: 
			return {
				...state,
				error: false,
				searching: true
			};
		case TEACHER_SEARCHING:
			return {
				...state,
				teacher: action.payload
			};
		case TEACHER_FETCH:
			return {
				...state,
				searching: false,
				error: false,
				teacherData: action.payload
			};
		case TEACHER_ERROR:
			return {
				...state,
				searching: false,
				error: true
			};
		default: 
			return state;
	}
};
