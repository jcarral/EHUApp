import { combineReducers } from 'redux';
import { authReducer } from '../auth/auth.reducer';
import { searchReducer } from '../search/index';
import { teacherReducer } from '../teacher/teacher.reducer';
import { subjectReducer } from '../subject/subject.reducer';
import { degreeReducer } from '../degree/degree.reducer';
import { settingsReducer } from '../settings/settings.reducer';
import { userReducer } from '../user/user.reducer';
import { calendarReducer } from '../calendar';

export default combineReducers({
  auth: authReducer,
  search: searchReducer,
  teacher: teacherReducer,
  subject: subjectReducer,
  degree: degreeReducer,
  settings: settingsReducer,
  profile: userReducer,
  calendar: calendarReducer,
});
