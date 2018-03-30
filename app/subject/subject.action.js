import { START_LOADING, SUBJECT_ERROR, SUBJECT_FETCH } from './subject.types';
import { getSubjectFromFirebase } from '../lib';

export const getSubject = (subject) => async (dispatch) => {
	try{
		dispatch({
			type: START_LOADING
		});
		console.log('sub', subject)
		const result = await getSubjectFromFirebase(subject);
		console.log(result);
		dispatch({
			type: SUBJECT_FETCH,
			payload: result
		});
		
	}catch(err){
		console.log(err)
		dispatch({
			type: SUBJECT_ERROR
		})
	}
};

export const startSearching = () => ({
	type: START_LOADING
});

