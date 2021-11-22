export default class UserInfo {

  constructor () {
    this.name = null;
    this.descr = null;
  }

  getUserInfo () {
    const user = {
      name: this.name,
      descr: this.descr
    }
    return user;
  }

  setUserInfo (data) {
    this.name = data.name;
    this.descr = data.descr;
  }
}
