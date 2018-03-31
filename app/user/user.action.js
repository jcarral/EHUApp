import {
  SUCCESS_FETCHING_PROFILE,
  ERROR_EDITING_PROFILE,
  ERROR_FETCHING_PROFILE,
  START_EDITING_PROFILE,
  START_FETCHING_PROFILE,
  SUCCESS_EDITING_PROFILE,
  SUCCESS_NEW_SUBSCRIPTION_SUBJECTS,
  SUCCESS_NEW_SUBSCRIPTION_TEACHERS,
  ERROR_NEW_SUBSCRIPTION,
  START_NEW_SUBSCRIPTION,
  START_DELETING_SUBSCRIPTION,
  ERROR_DELETING_SUBSCRIPTION,
  SUCCESS_DELETING_SUBSCRIPTION_SUBJECTS,
  SUCCESS_DELETING_SUBSCRIPTION_TEACHERS,
  START_CHANGE_PASSWORD,
  SUCCESS_CHANGE_PASSWORD,
  ERROR_CHANGE_PASSWORD,
} from './user.types';

import {
  editProfileOnFirebase,
  getProfileFromFirebase,
  addSubscriptionOnFirebase,
  deleteSubscriptionOnFirebase,
  updatePasswordOnFirebase,
} from '../lib/firebase';

export const fetchProfile = uid => async (dispatch) => {
  try {
    dispatch({
      type: START_EDITING_PROFILE,
    });
    const profile = await getProfileFromFirebase(uid);
    return dispatch({
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

export const editProfile = profile => async (dispatch) => {
  try {
    dispatch({
      type: START_EDITING_PROFILE,
    });
    await editProfileOnFirebase(profile);
    return dispatch({
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

export const addNewSub = (subsType, data) => async (dispatch) => {
  try {
    dispatch({
      type: START_NEW_SUBSCRIPTION,
    });
    await addSubscriptionOnFirebase(subsType, data);
    let type;

    if (type === 'subjects') type = SUCCESS_NEW_SUBSCRIPTION_SUBJECTS;
    else if (type === 'teachers') type = SUCCESS_NEW_SUBSCRIPTION_TEACHERS;
    else {
      return dispatch({
        type: ERROR_NEW_SUBSCRIPTION,
        payload: 'Invalid subscription type',
      });
    }

    return dispatch({
      type,
      payload: data,
    });
  } catch (error) {
    return dispatch({
      type: ERROR_NEW_SUBSCRIPTION,
      payload: error,
    });
  }
};

export const deleteSubscription = (subsType, key) => async (dispatch) => {
  try {
    dispatch({
      type: START_DELETING_SUBSCRIPTION,
    });
    await deleteSubscriptionOnFirebase(subsType, key);
    let type;
    if (type === 'subjects') type = SUCCESS_NEW_SUBSCRIPTION_SUBJECTS;
    else if (type === 'teachers') type = SUCCESS_NEW_SUBSCRIPTION_TEACHERS;
    else {
      return dispatch({
        type: ERROR_DELETING_SUBSCRIPTION,
        payload: 'Invalid subscription type',
      });
    }
    return dispatch({
      type,
      payload: key,
    });
  } catch (error) {
    return dispatch({
      type: ERROR_DELETING_SUBSCRIPTION,
      payload: error,
    });
  }
};

export const updatePassword = (email, actualPass, nextPass) => async (dispatch) => {
  try {
    dispatch({
      type: START_CHANGE_PASSWORD,
    });

    await updatePasswordOnFirebase(email, actualPass, nextPass);
    dispatch({
      type: SUCCESS_CHANGE_PASSWORD,
    });
    return true;
  } catch (error) {
    dispatch({
      type: ERROR_CHANGE_PASSWORD,
      payload: error,
    });
    return false;
  }
};
