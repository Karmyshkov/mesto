const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('input[name="userName"]');
const jobInput = document.querySelector('input[name="userJob"]');
const btnEdit = document.querySelector('.profile__edit');
const btnClose = formElement.querySelector('.popup__close');
const currentValueName = document.querySelector('.profile__name');
const currentValueJob = document.querySelector('.profile__description');

btnEdit.addEventListener('click', openForm);

function openForm () {
  popup.classList.add('popup_opened');
  nameInput.value  = currentValueName.textContent;
  jobInput.value = currentValueJob.textContent;
}

btnClose.addEventListener('click', closePopap);

function closePopap () {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  
    evt.preventDefault();

    currentValueName.textContent = nameInput.value;
    currentValueJob.textContent = jobInput.value;

    popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler); 