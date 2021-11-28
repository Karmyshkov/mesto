import Popup from '../components/Popup.js';

export default class PopupConfirm extends Popup {

  constructor(sectionPopup, {submitHandler}) {
    super(sectionPopup);
    this.popup = document.querySelector(sectionPopup);
    this.submitHandler = submitHandler;
  }

  _submitFunc(evt) {
    evt.preventDefault();
    this.submitHandler();
  }

  setEventListeners() {
    super.setEventListeners();
    this.popup.addEventListener('submit', (evt) => this._submitFunc(evt));
  }
}
