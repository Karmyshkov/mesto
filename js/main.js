const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__container');
const nameInput = document.getElementById('userName');
const jobInput = document.getElementById('userJob');
const btnEdit = document.querySelector('.profile__edit');
const btnClose = formElement.querySelector('.popup__close');
const currentValueName = document.querySelector('.profile__name');
const currentValueJob = document.querySelector('.profile__description');

const openForm = () => {
  popup.classList.add('popup_opened');
  nameInput.value  = currentValueName.textContent;
  jobInput.value = currentValueJob.textContent;
}

const closePopap = () => {
  popup.classList.remove('popup_opened');
}

const formSubmitHandler = evt => {
    evt.preventDefault();

    currentValueName.textContent = nameInput.value;
    currentValueJob.textContent = jobInput.value;

    closePopap();
}

btnEdit.addEventListener('click', openForm);
btnClose.addEventListener('click', closePopap);
formElement.addEventListener('submit', formSubmitHandler); 