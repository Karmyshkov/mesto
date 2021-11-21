export default class Popup {

  constructor (sectionPopup) {
    this.popup = document.querySelector(sectionPopup);
    this.btnClose = this.popup.querySelector('.popup__close');
  }

  openPopup () {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  }

  closePopup () {
    const activePopup = document.querySelector('.popup_opened');
    if (activePopup) activePopup.classList.remove('popup_opened');
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
