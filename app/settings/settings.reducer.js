import { CHANGE_LOCALE } from './settings.types';
import { Translate } from '../lib';

const defaultState = {
  locale: Translate.getLocale(),
};

export const settingsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CHANGE_LOCALE:
      return {
        ...state,
        locale: action.payload,
      };
    default:
      return state;
  }
};
