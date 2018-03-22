import {
 GRADE_ERROR, GRADE_FETCH, START_SEARCHING
} from './grade.types';
import { getGradeFromFirebase } from '../lib';

export const getGrade = (grade) => async (dispatch) => {
	try{
		dispatch({
			type: START_SEARCHING
		});
		console.log(grade);
		const result = await getGradeFromFirebase(grade.code, grade.school.code, grade.campus);
		dispatch({
			type: GRADE_FETCH,
			payload: result
		});
	}catch(err){
		console.log(err);
		dispatch({
			type: GRADE_ERROR
		});
	}
};

export const startSearching = () => ({
	type: START_SEARCHING
});
