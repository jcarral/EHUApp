import { START_LOGIN, SUCCESS_LOGIN, ERROR_LOGIN, SUCCESS_SIGNUP, START_SIGNUP, ERROR_SIGNUP } from './auth.types';
import { loginOnFirebase, signUpOnFirebase } from '../lib';

export const login = credentials => async dispatch => {
  try {
    dispatch({
      type: START_LOGIN,
    });

    const user = await loginOnFirebase(credentials);
    return dispatch({
      type: SUCCESS_LOGIN,
      payload: user,
    });
  } catch (error) {
    dispatch({
      type: ERROR_LOGIN,
      payload: 'Error: Can\'t login',
    })
  }
};

export const signup = userDetail => async dispatch => {
  try{
    dispatch({
      type: START_SIGNUP,
    });

    const user = await signUpOnFirebase(userDetail);
    return dispatch({
      type: SUCCESS_SIGNUP,
      payload: user,
    });

  }catch(error){

    dispatch({
      type: ERROR_SIGNUP,
      payload: 'Error: Can\'t create the user ' + error,
    });
  }
};
