import { START_SEARCHING, TEACHER_ERROR, TEACHER_FETCH, TEACHER_SEARCHING } from './teacher.types';
import { getTeacherFromFirebase } from '../lib';

export const getTeacher = (teacher) => async (dispatch) => {
	try {
		console.log('Buscando...');
		dispatch({
			type: START_SEARCHING
		});
		console.log('Buscando profesor...');
		dispatch({
			type: TEACHER_SEARCHING,
			payload: teacher
		});
		console.log('Obteniendo datos');
		const data = await getTeacherFromFirebase(teacher);
		console.log(data);
		dispatch({
			type: TEACHER_FETCH,
			payload: data
		});
	}
	catch (error) {
		console.log('Error:', err);
		dispatch({
			type: TEACHER_ERROR
		});
	}
};	
