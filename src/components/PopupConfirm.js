import Popup from '../components/Popup.js';

export default class PopupConfirm extends Popup {

  constructor(sectionPopup, {handlerSubmitForm}) {
    super(sectionPopup);
    this.popup = document.querySelector(sectionPopup);
    this._handlerSubmitForm = handlerSubmitForm;
  }

  // _submitFunc(evt) {
  //   evt.preventDefault();
  //   this.submitHandler();
  // }

  setActionHandler(action) {
    this._handlerSubmitForm = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this.popup.addEventListener('submit', (evt) => this._handlerSubmitForm(evt));
  }
}
