export default class UserInfo {

  constructor (nameSelector, descrSelector) {
    this.name = document.querySelector(nameSelector);
    this.descr = document.querySelector(descrSelector);
    this.form = document.forms['form-edit-profile'];
    this.inputName = this.form.elements['user-name'];
    this.inputDescr = this.form.elements['user-job'];
  }

  getUserInfo () {
    const user = {
      name: this.name.textContent,
      descr: this.descr.textContent
    }
    return user;
  }

  setUserInfo () {
    const user = this.getUserInfo();

    this.inputName.value = user.name;
    this.inputDescr.value = user.descr;
  }
}
