import { CHANGE_LOCALE } from './settings.types';
import { Translate } from '../lib';

export const changeLocale = locale => async (dispatch) => {
  await Translate.saveLocale(locale);
  Translate.configureLocale(locale);
  return dispatch({
    type: CHANGE_LOCALE,
    payload: locale,
  });
};
