import { Translate } from '../lib';
import {
  START_LOGIN,
  SUCCESS_LOGIN,
  ERROR_LOGIN,
  SUCCESS_SIGNUP,
  START_SIGNUP,
  ERROR_SIGNUP,
  SUCCESS_LOGOUT,
  ERROR_LOGOUT,
  START_GETTING_USER,
  SUCCESS_GETTING_USER,
  ERROR_GETTING_USER,
} from './auth.types';

const initialState = {
  isAuthenticated: false,
  isLoggingIn: false,
  isLoggingOut: false,
  accessToken: null,
  user: {},
  hasInitialUser: false,
  locale: Translate.getLocale(),
  error: '',
};

export const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case START_LOGIN:
    case START_SIGNUP:
    case START_GETTING_USER:
      return {
        ...state,
        isAuthenticated: false,
        isLoggingIn: true,
      };
    case SUCCESS_LOGIN:
    case SUCCESS_SIGNUP:
    case SUCCESS_GETTING_USER:
      return {
        ...state,
        isAuthenticated: (Object.keys(action.payload).length > 0),
        isLoggingIn: false,
        user: action.payload,
      };
    case ERROR_LOGIN:
    case ERROR_SIGNUP:
    case ERROR_GETTING_USER:
    case ERROR_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        isLoggingIn: false,
        user: {},
        error: action.payload,
      };
    case SUCCESS_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        error: null,
        user: {},
        isLoggingIn: false,
      };
    default:
      return state;
  }
};
