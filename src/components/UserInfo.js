export default class UserInfo {

  constructor (nameSelector, descrSelector, avatarSelector) {
    this.name = document.querySelector(nameSelector);
    this.descr = document.querySelector(descrSelector);
    this.avatar = document.querySelector(avatarSelector);
  }

  getUserInfo () {
    const user = {
      name: this.name.textContent,
      descr: this.descr.textContent,
      avatar: this.avatar.src
    }
    return user;
  }

  setUserInfo (data) {
    this.name.textContent = data['user-name'];
    this.descr.textContent = data['user-job'];
  }
}
