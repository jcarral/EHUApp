import { combineReducers } from 'redux';
import { authReducer } from '../auth/auth.reducer';
import { searchReducer } from '../search/index';

export default combineReducers({
	auth: authReducer,
	search: searchReducer
});
