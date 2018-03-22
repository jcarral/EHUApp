import { CHANGE_LOCALE } from './settings.types';
import { Translate } from '../lib';

export const changeLocale = locale => async dispatch => {
  console.log(locale);
  await Translate.saveLocale(locale);
  Translate.configureLocale(locale);
  console.log(locale);
  return dispatch({
    type: CHANGE_LOCALE,
    payload: locale,
  });
};
