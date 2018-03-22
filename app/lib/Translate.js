import { AsyncStorage } from 'react-native';
import I18n from '../locale';
import { common } from '../config';

export class Translate {
  static t = key => I18n.t(key, I18n.locale);

  static getLocale = () => {
    const locale = (I18n.locale && I18n.locale.toLowerCase()) || common.defaultLocale;
    return locale;
  };
  static getCurrentLocale = async () => {
    const deviceLocale = Translate.getLocale();
    const storageLocale = await AsyncStorage.getItem('locale');
    console.log('storage locale', storageLocale, deviceLocale)
    return storageLocale || deviceLocale;
  };

  static configureLocale = locale => {
    I18n.locale = locale;
  };
  
  static saveLocale = async locale => {
    await AsyncStorage.setItem('locale', locale);
    return true;
  };

}
