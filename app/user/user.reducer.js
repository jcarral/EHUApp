import {
  SUCCESS_FETCHING_PROFILE,
  ERROR_EDITING_PROFILE,
  ERROR_FETCHING_PROFILE,
  START_EDITING_PROFILE,
  START_FETCHING_PROFILE,
  SUCCESS_EDITING_PROFILE,
  START_NEW_SUBSCRIPTION,
  SUCCESS_NEW_SUBSCRIPTION_SUBJECTS,
  SUCCESS_NEW_SUBSCRIPTION_TEACHERS,
  ERROR_NEW_SUBSCRIPTION,
  START_DELETING_SUBSCRIPTION,
  ERROR_DELETING_SUBSCRIPTION,
  SUCCESS_DELETING_SUBSCRIPTION_SUBJECTS,
  SUCCESS_DELETING_SUBSCRIPTION_TEACHERS,
  START_CHANGE_PASSWORD,
  ERROR_CHANGE_PASSWORD,
  SUCCESS_CHANGE_PASSWORD,
} from './user.types';

const defaultState = {
  data: {},
  subjects: {},
  teachers: {},
  grade: '',
  error: '',
  fetching: false,
};

export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case START_FETCHING_PROFILE:
    case START_NEW_SUBSCRIPTION:
    case START_DELETING_SUBSCRIPTION:
    case START_EDITING_PROFILE:
    case START_CHANGE_PASSWORD:
      return {
        ...state,
        fetching: true,
        error: '',
      };
    case SUCCESS_FETCHING_PROFILE:
      const {
        data, subjects, teachers, grade,
      } = action.payload;
      return {
        ...state,
        data,
        subjects,
        teachers,
        grade,
        fetching: false,
        error: '',
      };
    case SUCCESS_NEW_SUBSCRIPTION_SUBJECTS:
      return {
        ...state,
        subjects: Object.assign({}, state.subjects, action.payload),
        fetching: false,
        error: '',
      };
    case SUCCESS_NEW_SUBSCRIPTION_TEACHERS:
      const nextTeacher = Object.assign({}, state.teachers, action.payload);
      return {
        ...state,
        teachers: nextTeacher,
        fetching: false,
        error: '',
      };
    case SUCCESS_DELETING_SUBSCRIPTION_SUBJECTS:
      const tmpStateSubjects = Object.assign({}, state);
      delete tmpStateSubjects[action.payload];
      return {
        ...state,
        subjects: tmpStateSubjects,
        fetching: false,
        error: '',
      };
    case SUCCESS_DELETING_SUBSCRIPTION_TEACHERS:
      const tmpStateTeachers = Object.assign({}, state);
      delete tmpStateTeachers[action.payload];
      return {
        ...state,
        teachers: tmpStateTeachers,
        fetching: false,
        error: '',
      };
    case SUCCESS_CHANGE_PASSWORD:
      return {
        ...state,
        fetching: false,
        error: '',
      };
    case ERROR_CHANGE_PASSWORD:
    case ERROR_FETCHING_PROFILE:
    case ERROR_NEW_SUBSCRIPTION:
    case ERROR_DELETING_SUBSCRIPTION:
    case ERROR_EDITING_PROFILE:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
