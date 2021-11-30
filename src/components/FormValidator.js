export default class FormValidator {

  constructor(config, elemForm) {
    this._formSelector = config.formSelector;
    this._formEditNameSelectorEditProfile = config.formEditNameSelectorEditProfile;
    this._formEditNameSelectorAddPlace = config.formEditNameSelectorAddPlace;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._elemForm = elemForm;
    this._inputs = this._elemForm.querySelectorAll(this._inputSelector);
    this._btn = this._elemForm.querySelector(this._submitButtonSelector);
  }

  _closeErrorMessage(errorField) {
    errorField.classList.remove(this._errorClass);
    errorField.textContent = '';
  }

  _showErrorMessage(errorField, inputElement) {
    errorField.classList.add(this._errorClass);
    errorField.textContent = inputElement.validationMessage;
  }

  _findErrorField(inputElement) {
    return this._elemForm.querySelector(`#${inputElement.id}-error`);
  }

  _checkValidInput(inputElement) {
    const isValidInput = inputElement.validity.valid;

    const errorField = this._findErrorField(inputElement);

    if (isValidInput) {
      this._closeErrorMessage(errorField);
    } else {
      this._showErrorMessage(errorField, inputElement);
    }
  }

  _toggleBtnState(flag) {
    if (flag) {
      this._btn.classList.remove(this._inactiveButtonClass);
      this._btn.disabled = false;
    } else {
      this._btn.classList.add(this._inactiveButtonClass);
      this._btn.disabled = true;
    }
  }

  toggleBtnState(flag) {
    this._toggleBtnState(flag);
  }

  _checkStateForm() {
    return this._elemForm.checkValidity();
  }

  resetValidation() {
    this._inputs.forEach(input => {
      const errorField = this._findErrorField(input);
      this._closeErrorMessage(errorField);
    });
  }

  _setAddEventListener() {
    this._toggleBtnState(false);

    this._inputs.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        const isStateForm = this._checkStateForm();

        this._checkValidInput(inputElement);
        this._toggleBtnState(isStateForm);
      });
    })
  }

  enableValidation() {
    this._setAddEventListener();

    this._elemForm.addEventListener('submit', evt => {
      evt.preventDefault();
    })
  }
}
