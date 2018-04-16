import { GRADE_ERROR, GRADE_FETCH, START_SEARCHING } from './grade.types';

const initialState = {
  grade: {},
  error: false,
  searching: true,
};

export const gradeReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_SEARCHING:
      return {
        ...state,
        searching: true,
        error: false,
      };
    case GRADE_FETCH:
      return {
        ...state,
        searching: false,
        error: false,
        grade: action.payload,
      };
    case GRADE_ERROR:
      return {
        ...state,
        searching: false,
        error: true,
      };
    default:
      return state;
  }
};
