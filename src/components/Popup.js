export default class Popup {

  constructor (sectionPopup) {
    this.popup = document.querySelector(sectionPopup);
    this.btnClose = this.popup.querySelector('.popup__close');
    this._handleEscClose = this._handleEscClose.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  openPopup () {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  closePopup () {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  _closePopupByOutsideZone(evt) {
    const event = evt.target;
    if (event.parentElement.classList.contains('body')) this.closePopup();
  }

  setEventListeners () {
    this.btnClose.addEventListener('click', this.closePopup);
    this.popup.addEventListener('click', (evt) => this._closePopupByOutsideZone(evt));
  }
}
