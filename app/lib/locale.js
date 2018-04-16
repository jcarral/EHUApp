import I18n from '../locale';
import { common } from '../config';

export const getLocale = () => {
  const locale = (I18n.locale && I18n.locale.toLowerCase()) || common.defaultLocale;
  return locale;
};

