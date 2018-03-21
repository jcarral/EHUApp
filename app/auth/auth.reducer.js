import { getLocale } from '../lib';

const initialState = {
	isAuthenticated: false,
	locale: getLocale()
};

export const authReducer = (state = initialState, action = {}) => {
	switch(action.type){
		default:
			return state;
	}
};
