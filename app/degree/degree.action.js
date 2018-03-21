import {
 DEGREE_ERROR, DEGREE_FETCH, START_SEARCHING
} from './degree.types';
import { getDegreeFromFirebase } from '../lib';

export const getDegree = (degree) => async (dispatch) => {
	try{
		dispatch({
			type: START_SEARCHING
		});
		console.log(degree);
		const result = await getDegreeFromFirebase(degree.code, degree.school.code, degree.campus);
		dispatch({
			type: DEGREE_FETCH,
			payload: result
		});
	}catch(err){
		console.log(err);
		dispatch({
			type: DEGREE_ERROR
		});
	}
};

export const startSearching = () => ({
	type: START_SEARCHING
});
