import { 
  SUCCESS_FETCHING_PROFILE,
  ERROR_EDITING_PROFILE, 
  ERROR_FETCHING_PROFILE, 
  START_EDITING_PROFILE, 
  START_FETCHING_PROFILE, 
  SUCCESS_EDITING_PROFILE,
} from './user.types';

const defaultState = {
  data: {},
  subjects: {},
  teachers: {},
  grade: '',
};

export const userReducer = (state = defaultState, action) => {
  switch (state.action) {
    default:
      return state;
  };
};
