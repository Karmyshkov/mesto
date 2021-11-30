export default class UserInfo {

  constructor(nameSelector, descrSelector, avatarSelector) {
    this.name = document.querySelector(nameSelector);
    this.descr = document.querySelector(descrSelector);
    this.avatar = document.querySelector(avatarSelector);
    this.id = null;
  }

  getUserInfo() {
    const user = {
      name: this.name.textContent,
      descr: this.descr.textContent,
      avatar: this.avatar.src,
      id: this.id
    }
    return user;
  }

  setUserInfo({_id ,name, about, avatar}) {
    this.id = _id;
    this.name.textContent = name;
    this.descr.textContent = about;
    this.avatar.src = avatar;
  }

  setAvatar({avatar}) {
    this.avatar.src = avatar;
  }
}
