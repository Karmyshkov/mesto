export default class Api {

  constructor({url, headers}) {
    this.url = url;
    this.headers = headers;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: {
        authorization: this.headers.authorization
      }
    })
    .then(dataCards => this._checkStatus(dataCards));
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
    .then(dataCard => this._checkStatus(dataCard));
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: this.headers.authorization
      }
    })
    .then(dataUser => this._checkStatus(dataUser))
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
    .then(dataUser => this._checkStatus(dataUser))
  }
}
