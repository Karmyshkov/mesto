export default class UserInfo {

  constructor(nameSelector, descrSelector, avatarSelector) {
    this.name = document.querySelector(nameSelector);
    this.descr = document.querySelector(descrSelector);
    this.avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const user = {
      name: this.name.textContent,
      descr: this.descr.textContent,
      avatar: this.avatar.src
    }
    return user;
  }

  setUserInfo({name, about}) {
    this.name.textContent = name;
    this.descr.textContent = about;
  }

  setAvatar({avatar}) {
    this.avatar.src = avatar;
  }
}
