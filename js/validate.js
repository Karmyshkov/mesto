const validationConfig = {
  formSelector: '.popup__form',
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

function toggleBtnState (btn, flag) {
  if (flag) {
    btn.classList.remove('popup__btn_disabled');
    btn.disabled = false;
  } else {
    btn.classList.add('popup__btn_disabled');
    btn.disabled = true;
  }
}

function setAddEventListener (elemForm, config) {
  const inputElements = elemForm.querySelectorAll(config.inputSelector);
  const currentBtn = elemForm.querySelector('.popup__btn');

  inputElements.forEach(inputElement => {
    inputElement.addEventListener('blur', () => {
      const isStateForm = elemForm.checkValidity();
      checkValidInput(elemForm, inputElement, config);
      toggleBtnState(currentBtn, isStateForm);
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