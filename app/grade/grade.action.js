import { GRADE_ERROR, GRADE_FETCH, START_SEARCHING } from './degree.types';
import { getDegreeFromFirebase } from '../lib';

export const getDegree = degree => async (dispatch) => {
  try {
    dispatch({
      type: START_SEARCHING,
    });
    const result = await getDegreeFromFirebase(degree.code, degree.school.code, degree.campus);
    dispatch({
      type: GRADE_FETCH,
      payload: result,
    });
  } catch (err) {
    dispatch({
      type: GRADE_ERROR,
    });
  }
};

export const startSearching = () => ({
  type: START_SEARCHING,
});
