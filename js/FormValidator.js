export const validationConfig = {
  formSelector: '.popup__form',
  formEditNameSelectorEditProfile: 'form-edit-profile',
  formEditNameSelectorAddPlace: 'form-add-place',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__error',
  errorClass: 'popup__error_invalid'
}

class FormValidator {
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

  _checkStateForm () {
    return this.elemForm.checkValidity();
  }

  _setAddEventListener () {
    const inputElements = this.elemForm.querySelectorAll(this.inputSelector);
    const btn = this.elemForm.querySelector(this.submitButtonSelector);
  
    this._checkForEditFormName(btn);
  
    inputElements.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        const isStateForm = this._checkStateForm();
  
        this._checkValidInput(inputElement);
        this._toggleBtnState(btn, isStateForm);
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

const forms = document.querySelectorAll(validationConfig.formSelector);
forms.forEach(elem => {
  const formValidator = new FormValidator(validationConfig, elem);
  formValidator.enableValidation();
})