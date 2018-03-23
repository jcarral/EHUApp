import {
  SUCCESS_FETCHING_PROFILE,
  ERROR_EDITING_PROFILE,
  ERROR_FETCHING_PROFILE,
  START_EDITING_PROFILE,
  START_FETCHING_PROFILE,
  SUCCESS_EDITING_PROFILE,
} from './user.types';
import { editProfileOnFirebase, getProfileFromFirebase } from '../lib/firebase';

export const fetchProfile = uid => async dispatch => {
  try {
    dispatch({
      type: START_EDITING_PROFILE,
    });
    const profile = await getProfileFromFirebase(uid);
    dispatch({
      type: SUCCESS_FETCHING_PROFILE,
      payload: profile,
    });
  } catch (e) {
    return dispatch({
      type: ERROR_FETCHING_PROFILE,
      payload: e,
    });
  }
};

export const editProfile = ( uid, profile ) => async dispatch => {
  try {
    dispatch({
      type: START_EDITING_PROFILE,
    });
    await editProfile(uid, profile);
    dispatch({
      type: SUCCESS_EDITING_PROFILE,
      payload: profile,
    });
  } catch (e) {
    return dispatch({
      type: ERROR_EDITING_PROFILE,
      payload: e,
    });
  }
};
