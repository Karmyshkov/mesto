export default class FormValidator {

  constructor (config, elemForm) {
    this.formSelector = config.formSelector;
    this.formEditNameSelectorEditProfile = config.formEditNameSelectorEditProfile;
    this.formEditNameSelectorAddPlace = config.formEditNameSelectorAddPlace;
    this.inputSelector = config.inputSelector;
    this.submitButtonSelector = config.submitButtonSelector;
    this.inactiveButtonClass = config.inactiveButtonClass;
    this.inputErrorClass = config.inputErrorClass;
    this.errorClass = config.errorClass;
    this.elemForm = elemForm;
    this.inputs = this.elemForm.querySelectorAll(this.inputSelector);
    this.btn = this.elemForm.querySelector(this.submitButtonSelector);
  }

  _closeErrorMessage (errorField) {
    errorField.classList.remove(this.errorClass);
    errorField.textContent = '';
  }

  _showErrorMessage (errorField, inputElement) {
    errorField.classList.add(this.errorClass);
    errorField.textContent = inputElement.validationMessage;
  }

  _findErrorField (inputElement) {
    return this.elemForm.querySelector(`#${inputElement.id}-error`);
  }

  _checkValidInput (inputElement) {

    const isValidInput = inputElement.validity.valid;

    const errorField = this._findErrorField(inputElement);

    if (isValidInput) {
      this._closeErrorMessage(errorField);
    } else {
      this._showErrorMessage(errorField, inputElement);
    }
  }

  _checkForEditFormName (btn) {
    if (this.elemForm.name === this.formEditNameSelectorEditProfile) {
      this._toggleBtnState(btn, true);
    } else {
      this._toggleBtnState(btn, false);
    }
  }

  _toggleBtnState (btn, flag) {
    if (flag) {
      btn.classList.remove(this.inactiveButtonClass);
      btn.disabled = false;
    } else {
      btn.classList.add(this.inactiveButtonClass);
      btn.disabled = true;
    }
  }

  toggleBtnState (btn, flag) {
    this._toggleBtnState(btn, flag);
  }

  _checkStateForm () {
    return this.elemForm.checkValidity();
  }

  _setAddEventListener () {
    this._checkForEditFormName(this.btn);

    this.inputs.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        const isStateForm = this._checkStateForm();

        this._checkValidInput(inputElement);
        this._toggleBtnState(this.btn, isStateForm);
      });
    })
  }

  enableValidation () {
    this._setAddEventListener();

    this.elemForm.addEventListener('submit', evt => {
      evt.preventDefault();
    })
  }
}
