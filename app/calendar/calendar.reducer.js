import {
  ERROR_FETCH_CALENDAR,
  START_FETCH_CALENDAR,
  SUCCESS_FETCH_CALENDAR,
} from './calendar.types';

const defaultState = {
  ehu: {},
  grades: {},
  fetching: false,
  error: null,
};

export const calendarReducer = (state = defaultState, action) => {
  switch (action.type) {
    case START_FETCH_CALENDAR:
      return {
        ...state,
        fetching: true,
        error: null,
      };
    case SUCCESS_FETCH_CALENDAR:
      return {
        ...state,
        fetching: false,
        error: null,
        ehu: action.payload,
      };
    case ERROR_FETCH_CALENDAR:
      return {
        ...state,
        error: action.payload,
        fetching: false,
      };
    default:
      return state;
  }
};
