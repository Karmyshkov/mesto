import {Card} from '../js/card.js';
import {validationConfig} from '../js/FormValidator.js';

export const cardTemplate = document.querySelector('.card-template');
export const cardList = document.querySelector('.places__cards');
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const popupAddCard = document.querySelector('.popup_type_add-card');
export const popupMoreCard = document.querySelector('.popup_type_more');
export const nameInput = document.getElementById('user-name');
export const jobInput = document.getElementById('user-job');
export const btnEdit = document.querySelector('.profile__edit');
export const btnAddCard = document.querySelector('.profile__btn');
export const btnCloseFormProfile = popupEditProfile.querySelector('.popup__close');
export const btnCloseFormAddCard = popupAddCard.querySelector('.popup__close');
export const btnCloseFormMore = popupMoreCard.querySelector('.popup__close');
export const currentValueName = document.querySelector('.profile__name');
export const currentValueJob = document.querySelector('.profile__description');
export const newPlace = document.getElementById('new-place');
export const newImg = document.getElementById('new-img');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const baseFunctionsForCard = {
  openPopup,
  closePopup,
  closeByEscape,
  closePopupByOutsideZone
}

initialCards.forEach(elem => {
  const card = new Card(elem, cardTemplate, baseFunctionsForCard);
  card.renderCard();
})

function closePopupByOutsideZone(evt) {
  const event = evt.target;
  if (event.parentElement.classList.contains('body')) closePopup();
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function addInfoForm () {
  nameInput.value  = currentValueName.textContent;
  jobInput.value = currentValueJob.textContent;
}

function openPopup (element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup () {
  const activePopup = document.querySelector('.popup_opened');
  if (activePopup) activePopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape); 
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    currentValueName.textContent = nameInput.value;
    currentValueJob.textContent = jobInput.value;

    closePopup();
}

function clearInput () {
  newPlace.value = '';
  newImg.value = '';
}

function addCardHandler (evt) {
  evt.preventDefault();

  const newItem = {
    name: newPlace.value, 
    link: newImg.value
  }

  const card = new Card(newItem, cardTemplate);
  card.renderCard();
  closePopup();
  clearInput();
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

btnEdit.addEventListener('click', () => {
  openPopup(popupEditProfile);
  addInfoForm();
});
btnAddCard.addEventListener('click', () => openPopup(popupAddCard));
btnCloseFormProfile.addEventListener('click', closePopup);
btnCloseFormAddCard.addEventListener('click', closePopup);
popupEditProfile.addEventListener('submit', formSubmitHandler);
popupEditProfile.addEventListener('click', closePopupByOutsideZone);
popupAddCard.addEventListener('submit', (evt) => {
  addCardHandler(evt)
  const addCardForm = document.forms['form-add-place'];
  const btnSubmit = addCardForm.querySelector('.popup__btn');
  toggleBtnState(btnSubmit, false, validationConfig);
})
popupAddCard.addEventListener('click', closePopupByOutsideZone);