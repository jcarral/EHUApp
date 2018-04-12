export class Helper {
  static isEmailValid(email) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email);
  }

  static isValidPassword(p1, p2) {
    return p1 === p2 && p1.length >= 6;
  }

  static isValidJSON(text) {
    if (typeof text !== typeof 'string') return false;
    try {
      JSON.parse(text);
      return true;
    } catch (e) {
      return false;
    }
  }
  static hasProperty = (object, prop) => Object.keys(object).includes(prop);
  static hasProperties = (object = {}, props = []) => {
    const keys = Object.keys(object);
    return props.reduce((included, num) => included && keys.includes(num), true);
  }
  static isNaN = x => typeof x === 'number';
}
