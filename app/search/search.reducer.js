import {
	START_SEARCHING, SUBJECTS_FETCH, TEACHERS_FETCH, DEGREES_FETCH, CHANGE_TAB, START_SEARCHING_TEACHERS, START_SEARCHING_DEGREES, START_SEARCHING_SUBJECTS
} from './search.types';

const initialState = {
	searchSubjectText: '',
	searchTeacherText: '',
	searchDegreeText: '',
	selectedIndex: 0,
	searching: false,
	subjects: [],
	teachers: [],
	degrees: []
};


export const searchReducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case START_SEARCHING:
			return {
				...state,
				searching: true
			};
		case START_SEARCHING_DEGREES:
			return {
				...state,
				searchDegreeText: action.payload
			};
		case START_SEARCHING_SUBJECTS:
			return {
				...state,
				searchSubjectText: action.payload
			};
		case START_SEARCHING_TEACHERS:
			return {
				...state,
				searchTeacherText: action.payload
			};
		case SUBJECTS_FETCH:
			return {
				...state,
				searching: false,
				subjects: action.payload
			};
		case TEACHERS_FETCH:
			return {
				...state,
				searching: false,
				teachers: action.payload
			};
		case DEGREES_FETCH:
			return {
				...state,
				searching: false,
				degrees: action.payload
			};
		case CHANGE_TAB:
			return {
				...state,
				selectedIndex: action.payload
			};
		default:
			return state;
	}
};
