const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formElement = document.querySelector('.popup__container');
const nameInput = document.getElementById('userName');
const jobInput = document.getElementById('userJob');
const btnEdit = document.querySelector('.profile__edit');
const btnAddCard = document.querySelector('.profile__btn');
const btnCloseEditForm = popupEditProfile.querySelector('.popup__close');
const btnCloseAddCardForm = popupAddCard.querySelector('.popup__close');
const currentValueName = document.querySelector('.profile__name');
const currentValueJob = document.querySelector('.profile__description');

const addInfoForm = () => {
  nameInput.value  = currentValueName.textContent;
  jobInput.value = currentValueJob.textContent;
}

const openForm = (element, fnc = null) => {
  element.classList.add('popup_opened');
  if (typeof fnc !== "object") fnc();
}

const closePopap = element => {
  element.classList.remove('popup_opened');
}

const formSubmitHandler = evt => {
    evt.preventDefault();

    currentValueName.textContent = nameInput.value;
    currentValueJob.textContent = jobInput.value;

    closePopap(popupEditProfile);
}

btnEdit.addEventListener('click', () => openForm(popupEditProfile, addInfoForm));
btnCloseEditForm.addEventListener('click', () => closePopap(popupEditProfile));
btnAddCard.addEventListener('click', () => openForm(popupAddCard));
btnCloseAddCardForm.addEventListener('click', () => closePopap(popupAddCard));

formElement.addEventListener('submit', formSubmitHandler); 