import { DEGREE_ERROR, DEGREE_FETCH, START_SEARCHING } from './degree.types';

const initialState = {
  degree: {},
  error: false,
  searching: true,
};

export const degreeReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_SEARCHING:
      return {
        ...state,
        searching: true,
        error: false,
      };
    case DEGREE_FETCH:
      return {
        ...state,
        searching: false,
        error: false,
        degree: action.payload,
      };
    case DEGREE_ERROR:
      return {
        ...state,
        searching: false,
        error: true,
      };
    default:
      return state;
  }
};
