import { START_LOADING, SUBJECT_ERROR, SUBJECT_FETCH } from './subject.types';
import { getSubjectFromFirebase } from '../lib';

export const getSubject = subject => async (dispatch) => {
  try {
    dispatch({
      type: START_LOADING,
    });
    const result = await getSubjectFromFirebase(subject);
    return dispatch({
      type: SUBJECT_FETCH,
      payload: result,
    });
  } catch (err) {
    return dispatch({
      type: SUBJECT_ERROR,
    });
  }
};

export const startSearching = () => ({
  type: START_LOADING,
});

