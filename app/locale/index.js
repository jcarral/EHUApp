import I18n from 'react-native-i18n';
import { common } from '../config/';

import {
  es,
  en,
} from './languages';

I18n.fallbacks = true;
I18n.defaultLocale = common.defaultLocale;

I18n.translations = {
  es,
  en,
};

export default I18n;
