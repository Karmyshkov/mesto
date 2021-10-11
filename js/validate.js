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

function checkValidInput (elemForm, inputElement, config) {
  
  const isValidInput = inputElement.validity.valid;

  const errorField = elemForm.querySelector(`#${inputElement.id}-error`);
  
  if (isValidInput) {
    closeErrorMessage(errorField, config);
  } else {
    showErrorMessage(errorField, inputElement, config);
  }
}

function setAddEventListener (elemForm, config) {
  const inputElements = elemForm.querySelectorAll(config.inputSelector);

  inputElements.forEach(inputElement => {
    inputElement.addEventListener('blur', () => {
      checkValidInput(elemForm, inputElement, config);
    });
  })

  elemForm.addEventListener('submit', evt => {
    evt.preventDefault();

    console.log('Дописать логику')
  })
}

function enableValidation (config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach(elemForm => setAddEventListener(elemForm, config));
}

enableValidation(validationConfig);