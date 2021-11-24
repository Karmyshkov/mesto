export default class UserInfo {

  constructor (nameSelector, descrSelector) {
    this.name = document.querySelector(nameSelector);
    this.descr = document.querySelector(descrSelector);
  }

  getUserInfo () {
    const user = {
      name: this.name.textContent,
      descr: this.descr.textContent
    }
    return user;
  }

  setUserInfo (data) {
    this.name.textContent = data['user-name'];
    this.descr.textContent = data['user-job'];
  }
}
