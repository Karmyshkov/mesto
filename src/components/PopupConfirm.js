import Popup from '../components/Popup.js';

export default class PopupConfirm extends Popup {

  constructor(sectionPopup) {
    super(sectionPopup);
    this.popup = document.querySelector(sectionPopup);
  }

  setActionHandler(action) {
    this._handlerSubmitForm = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this.popup.addEventListener('submit', (evt) => this._handlerSubmitForm(evt));
  }
}
