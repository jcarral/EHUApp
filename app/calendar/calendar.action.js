import {
  ERROR_FETCH_CALENDAR,
  START_FETCH_CALENDAR,
  SUCCESS_FETCH_CALENDAR,
  SUCCESS_FETCH_GRADE_CALENDAR,
  ERROR_ADD_DATE,
  START_ADD_DATE,
  SUCCESS_ADD_DATE,
  ERROR_DELETE_DATE,
  START_DELETE_DATE,
  SUCCESS_DELETE_DATE,
  ERROR_LOAD_SCHEDULE,
  START_LOAD_SCHEDULE,
  SUCCESS_LOAD_SCHEDULE,
} from './calendar.types';
import {
  getCalendarFromFirebase,
  addDateOnFirebase,
  deleteDateFromFirebase,
  getSubjectSchedulesFromFirebase,
} from '../lib/firebase';
import { Dates, Helper } from '../lib';

export const fetchCalendar = () => async (dispatch) => {
  try {
    dispatch({
      type: START_FETCH_CALENDAR,
    });
    const calendar = await getCalendarFromFirebase('ehu') || {};
    dispatch({
      type: SUCCESS_FETCH_CALENDAR,
      payload: calendar,
    });
  } catch (e) {
    dispatch({
      type: ERROR_FETCH_CALENDAR,
      payload: e,
    });
  }
};

export const fetchDegreeCalendar = degree => async (dispatch) => {
  try {
    dispatch({
      type: START_FETCH_CALENDAR,
    });
    const calendar = await getCalendarFromFirebase(degree) || {};
    dispatch({
      type: SUCCESS_FETCH_GRADE_CALENDAR,
      payload: {
        calendar,
        name: degree,
      },
    });
  } catch (e) {
    dispatch({
      type: ERROR_FETCH_CALENDAR,
    });
  }
};

export const addDateToCalendar = (date, calendarName, type) => async (dispatch) => {
  try {
    dispatch({
      type: START_ADD_DATE,
    });
    if (!Dates.isCalendar(date)) {
      return dispatch({
        type: ERROR_ADD_DATE,
        payload: 'ERROR: Invalid date',
      });
    }
    const tmpCalendar = {};
    tmpCalendar[type] = date;
    const key = await addDateOnFirebase(date, calendarName, type);
    return dispatch({
      type: SUCCESS_ADD_DATE,
      payload: {
        date,
        type,
        key,
        name: calendarName,
      },
    });
  } catch (e) {
    return dispatch({
      type: ERROR_ADD_DATE,
    });
  }
};

export const deleteDate = (calendar, type, id) => async (dispatch) => {
  try {
    dispatch({
      type: START_DELETE_DATE,
    });
    await deleteDateFromFirebase(calendar, type, id);
    dispatch({
      type: SUCCESS_DELETE_DATE,
      payload: {
        calendar,
        type,
        id,
      },
    });
  } catch (e) {
    dispatch({
      type: ERROR_DELETE_DATE,
      payload: e,
    });
  }
};

export const fetchSchedules = list => async (dispatch) => {
  try {
    const random = Math.random();
    dispatch({
      type: START_LOAD_SCHEDULE,
      payload: list,
    });
    const schedules = await getSubjectSchedulesFromFirebase(list);
    dispatch({
      type: SUCCESS_LOAD_SCHEDULE,
      payload: {
        schedules,
        codes: Helper.unique(list.map(sub => sub.code)),
      },
    });
  } catch (e) {
    dispatch({
      type: ERROR_LOAD_SCHEDULE,
      payload: e,
    });
  }
};
