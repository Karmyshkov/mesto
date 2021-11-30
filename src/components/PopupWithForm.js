import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {

  constructor(sectionPopup, formName, {submitHandler}) {
    super(sectionPopup);
    this.inputs = Array.from(this.popup.querySelectorAll('.popup__field'));
    this.submitFunc = submitHandler;
    this._form = document.forms[formName];
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  _submitFunc(evt) {
    evt.preventDefault();
    this.submitFunc(this._getInputValues());
  }

  _getInputValues() {
    const formData = {};
    this.inputs.forEach(input => {
      formData[input.name] = input.value;
    });
    return formData;
  }

  setEventListeners() {
    super.setEventListeners();
    this.popup.addEventListener('submit', (evt) => this._submitFunc(evt));
  }
}
