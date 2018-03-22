import {
	START_SEARCHING, SUBJECTS_FETCH, TEACHERS_FETCH, GRADES_FETCH, CHANGE_TAB, START_SEARCHING_TEACHERS, START_SEARCHING_GRADES, START_SEARCHING_SUBJECTS
} from './search.types';

const initialState = {
	searchSubjectText: '',
	searchTeacherText: '',
	searchGradeText: '',
	selectedIndex: 0,
	searching: false,
	subjects: [],
	teachers: [],
	grades: []
};


export const searchReducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case START_SEARCHING:
			return {
				...state,
				searching: true
			};
		case START_SEARCHING_GRADES:
			return {
				...state,
				searchGradeText: action.payload
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
		case GRADES_FETCH:
			return {
				...state,
				searching: false,
				grades: action.payload
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
