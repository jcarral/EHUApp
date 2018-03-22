import { AsyncStorage } from 'react-native';
import { loginOnFirebase, signUpOnFirebase, Helper } from '../lib';

import { 
  START_LOGIN,
  SUCCESS_LOGIN, 
  ERROR_LOGIN, 
  SUCCESS_SIGNUP, 
  START_SIGNUP, 
  ERROR_SIGNUP, 
  START_LOGOUT, 
  SUCCESS_LOGOUT, 
  ERROR_LOGOUT,
  START_GETTING_USER,
  SUCCESS_GETTING_USER,
  ERROR_GETTING_USER, 
} from './auth.types';


export const login = credentials => async dispatch => {
  try {
    dispatch({
      type: START_LOGIN,
    });
    const user = await loginOnFirebase(credentials);
    await AsyncStorage.setItem('user', JSON.stringify(user));
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
    await AsyncStorage.setItem('user', JSON.stringify(user));
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

export const signOut = () => async dispatch => {
  try{
    dispatch({
      type: START_LOGOUT,
    });
    await AsyncStorage.clear();
    return dispatch({
      type: SUCCESS_LOGOUT,
    });
  }catch(e){
    return dispatch({
      type: ERROR_LOGOUT,
      payload: e,
    });
  }
};

export const getUser = () => async dispatch => {
  try{
    dispatch({
      type: START_GETTING_USER,
    });
    let user = await AsyncStorage.getItem('user');
    user = (Helper.isValidJSON(user))?JSON.parse(user):{};
    return dispatch({
      type: SUCCESS_GETTING_USER,
      payload: user,
    });
  }catch(e){
    return dispatch({
      type: ERROR_GETTING_USER,
      payload: e,
    });
  }
};
