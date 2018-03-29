import { Translate } from '../lib';
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

const initialState = {
	isAuthenticated: false,
	isLoggingIn: false,
	isLoggingOut: false,
	accessToken: null,
	user: {},
	hasInitialUser: false,
<<<<<<< HEAD
	locale: getLocale(),
	error: '',
=======
  locale: Translate.getLocale(),
	error: ''
>>>>>>> develop
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
			return {
				...state,
				isAuthenticated: false,
				isLoggingIn: false,
				user: {},
				error: action.payload,
      };
		default:
			return state;
	}
};
