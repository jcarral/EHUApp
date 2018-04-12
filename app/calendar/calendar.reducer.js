import {
  ERROR_FETCH_CALENDAR,
  START_FETCH_CALENDAR,
  SUCCESS_FETCH_CALENDAR,
  SUCCESS_FETCH_GRADE_CALENDAR,
  START_ADD_DATE,
  ERROR_ADD_DATE,
  SUCCESS_ADD_DATE,
  START_DELETE_DATE,
  ERROR_DELETE_DATE,
  SUCCESS_DELETE_DATE,
} from './calendar.types';

const defaultState = {
  ehu: {},
  grades: {},
  loadedCalendars: [],
  fetching: false,
  error: null,
};


const createObjectWithDates = (date, type, key, oldObject = {}) => {
  const tmpDate = {};
  const tmpType = {};
  tmpDate[key] = date;
  const copyOfDatesByType = Object.assign({}, oldObject[type], tmpDate);
  tmpType[type] = copyOfDatesByType;
  return Object.assign({}, oldObject, tmpType);
};

const deleteDate = (type, id, oldObject) => {
  const copy = Object.assign({}, oldObject);
  delete copy[type][id];
  return copy;
};

export const calendarReducer = (state = defaultState, action) => {
  switch (action.type) {
    case START_FETCH_CALENDAR:
    case START_ADD_DATE:
    case START_DELETE_DATE:
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
    case SUCCESS_FETCH_GRADE_CALENDAR:
      const tmpCalendar = {};
      tmpCalendar[action.payload.name] = action.payload.calendar;
      return {
        ...state,
        fetching: false,
        error: null,
        loadedCalendars: [...state.loadedCalendars, action.payload.name],
        grades: Object.assign({}, state.grades, tmpCalendar),
      };
    case SUCCESS_ADD_DATE:
      const {
        name,
        type,
        date,
        key,
      } = action.payload;
      if (name === 'ehu') {
        return {
          ...state,
          fetching: false,
          error: null,
          ehu: createObjectWithDates(date, type, key, state.ehu),
        };
      }
      const tmpGrade = {};
      tmpGrade[name] =
        createObjectWithDates(date, type, key, state.grades[name]);
      return {
        ...state,
        fetching: false,
        error: null,
        grades: Object.assign({}, state.grades, tmpGrade),
      };
    case SUCCESS_DELETE_DATE:
      if (action.payload.calendar === 'ehu') {
        return {
          ...state,
          fetching: false,
          error: null,
          ehu: deleteDate(action.payload.type, action.payload.id, state.ehu),
        };
      }
      const tmpDeleteGrade = {};
      tmpDeleteGrade[action.payload.calendar] =
        deleteDate(action.payload.type, action.payload.id, state.grades[action.payload.calendar]);
      return {
        ...state,
        fetching: false,
        error: null,
        grades: Object.assign({}, state.grades, tmpDeleteGrade),
      };
    case ERROR_DELETE_DATE:
    case ERROR_FETCH_CALENDAR:
    case ERROR_ADD_DATE:
      return {
        ...state,
        error: action.payload,
        fetching: false,
      };
    default:
      return state;
  }
};

