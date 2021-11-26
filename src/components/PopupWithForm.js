import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {

  constructor(sectionPopup, {submitHandler}) {
    super(sectionPopup);
    this.popup = document.querySelector(sectionPopup);
    this.inputs = Array.from(this.popup.querySelectorAll('.popup__field'));
    this.submitFunc = submitHandler;
  }

  _submitFunc(evt) {
    evt.preventDefault();
    this.submitFunc(this._getInputValues());
    this.closePopup();
  }

  closePopup() {
    super.closePopup();
    document.forms['form-add-place'].reset();
  }

  _getInputValues() {
    const dataForm = {};
    this.inputs.forEach(input => {
      dataForm[input.name] = input.value;
    });
    return dataForm;
  }

  setEventListeners() {
    super.setEventListeners();
    this.popup.addEventListener('submit', (evt) => this._submitFunc(evt));
  }
}
