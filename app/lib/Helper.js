export class Helper {

  static isEmailValid(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email);
  }

  static isValidPassword(p1, p2){
    return p1 === p2 && p1.length >= 6;
  }
}
