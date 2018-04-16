import { GRADE_ERROR, GRADE_FETCH, START_SEARCHING } from './grade.types';
import { getGradeFromFirebase } from '../lib';

export const getGrade = grade => async (dispatch) => {
  try {
    dispatch({
      type: START_SEARCHING,
    });
    const result = await getGradeFromFirebase(grade.code, grade.school.code, grade.campus);
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
