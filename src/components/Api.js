export default class Api {

  constructor({url, headers}) {
    this.url = url;
    this.headers = headers;
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: {
        authorization: this.headers.authorization
      }
    })
    .then(dataUser => dataUser.json());
  }

  addNewCard({name, link}) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.headers.authorization,
        "Content-Type": this.headers['Content-Type'],
      },
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(dataUser => dataUser.json());
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: this.headers.authorization
      }
    })
    .then(dataUser => dataUser.json());
  }

  changeUserInfo({name, about}) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.headers.authorization,
        "Content-Type": this.headers['Content-Type'],
      },
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(dataUser => dataUser.json());
  }

}
