import { START_SEARCHING, TEACHER_ERROR, TEACHER_FETCH, TEACHER_SEARCHING } from './teacher.types';
import { getTeacherFromFirebase } from '../lib';

export const getTeacher = (teacher) => async (dispatch) => {
	try {
		dispatch({
			type: START_SEARCHING
		});
		const data = await getTeacherFromFirebase(teacher);
		console.log('New Teacher');
		dispatch({
			type: TEACHER_FETCH,
			payload: data
		});
	}
	catch (error) {
		dispatch({
			type: TEACHER_ERROR
		});
	}
};	


export const startSearching = () => ({
	type: START_SEARCHING
});
