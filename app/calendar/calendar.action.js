import {
  ERROR_FETCH_CALENDAR,
  START_FETCH_CALENDAR,
  SUCCESS_FETCH_CALENDAR,
} from './calendar.types';
import { getCalendarFromFirebase } from '../lib/firebase';

export const fetchCalendar = () => async (dispatch) => {
  try {
    dispatch({
      type: START_FETCH_CALENDAR,
    });
    const calendar = await getCalendarFromFirebase('ehu');
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
