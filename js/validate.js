const validationConfig = {
  formSelector: '.popup__form',
  formEditNameSelector: 'form-edit-profile',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__error',
  errorClass: 'popup__error_invalid'
}

function closeErrorMessage (errorField, config) {
  errorField.classList.remove(config.errorClass);
  errorField.textContent = '';
}

function showErrorMessage (errorField, inputElement, config) {
  errorField.classList.add(config.errorClass);
  errorField.textContent = inputElement.validationMessage;
}

function findErrorField (elemForm, inputElement) {
  return elemForm.querySelector(`#${inputElement.id}-error`);
}

function checkValidInput (elemForm, inputElement, config) {
  
  const isValidInput = inputElement.validity.valid;

  const errorField = findErrorField(elemForm, inputElement);
  
  if (isValidInput) {
    closeErrorMessage(errorField, config);
  } else {
    showErrorMessage(errorField, inputElement, config);
  }
}

function checkForEditFormName (elemForm, btn, config) {
  if (elemForm.name === config.formEditNameSelector) {
    toggleBtnState(btn, true ,config);
  } else {
    toggleBtnState(btn, false ,config);
  }
}

function toggleBtnState (btn, flag, config) {
  if (flag) {
    btn.classList.remove(config.inactiveButtonClass);
    btn.disabled = false;
  } else {
    btn.classList.add(config.inactiveButtonClass);
    btn.disabled = true;
  }
}

function checkStateForm (elemForm) {
  return elemForm.checkValidity();
}

function setAddEventListener (elemForm, config) {
  const inputElements = elemForm.querySelectorAll(config.inputSelector);
  const btn = elemForm.querySelector(config.submitButtonSelector);

  checkForEditFormName(elemForm, btn, config);

  inputElements.forEach(inputElement => {
    inputElement.addEventListener('blur', () => {
      const isStateForm = checkStateForm(elemForm);

      checkValidInput(elemForm, inputElement, config);
      toggleBtnState(btn, isStateForm, config);
    });
  })

  elemForm.addEventListener('submit', evt => {
    evt.preventDefault();
  })
}

function enableValidation (config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach(elemForm => setAddEventListener(elemForm, config));
}

enableValidation(validationConfig);