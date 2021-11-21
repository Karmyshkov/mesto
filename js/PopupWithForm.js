import Popup from '../js/Popup.js';

export default class PopupWithForm extends Popup {

  constructor (sectionPopup, {submitFunc}) {
    super(sectionPopup);
    this.sectionPopup = document.querySelector(sectionPopup);
    this.inputs = Array.from(this.sectionPopup.querySelectorAll('.popup__field'));
    this.submitFunc = submitFunc;
  }

  closePopup () {
    super.closePopup();
    document.forms['form-add-place'].reset();
  }

  _formSubmit () {
    // this.submitFunc();
    // super.closePopup();
  }

  _getInputValues () {
    const dataForm = {};
    this.inputs.forEach(input => {
      dataForm[input.name] = input.value;
    });
  }

  setEventListeners () {
    super.setEventListeners();
    this._formSubmit();
  }
}
