import { getLocale } from '../lib';
import { START_LOGIN, SUCCESS_LOGIN, ERROR_LOGIN } from './auth.types';
const initialState = {
	isAuthenticated: false,
	isLoggingIn: false,
	isLoggingOut: false,
	accessToken: null,
	user: {},
	hasInitialUser: false,
	locale: getLocale(),
	error: ''
};

export const authReducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case START_LOGIN:
			return {
				...state,
				isAuthenticated: false,
				isLoggingIn: true,
			};
		case SUCCESS_LOGIN:
			return {
				...state,
				isAuthenticated: true,
				isLoggingIn: false,
				user: action.payload,
			};
		case ERROR_LOGIN:
			return {
				...state,
				isAuthenticated: false,
				isLoggingIn: false,
				user: {},
				error: action.payload
			};
		default:
			return state;
	}
};
