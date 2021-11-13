import * as con from '../js/constants.js';
import {Card} from '../js/card.js';
import {FormValidator} from '../js/FormValidator.js';

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
  const card = new Card(elem, con.cardTemplate, baseFunctionsForCard);
  card.renderCard();
})

const forms = document.querySelectorAll(con.validationConfig.formSelector);
forms.forEach(elem => {
  const formValidator = new FormValidator(con.validationConfig, elem);
  formValidator.enableValidation();
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
  con.nameInput.value  = con.currentValueName.textContent;
  con.jobInput.value = con.currentValueJob.textContent;
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

    con.currentValueName.textContent = con.nameInput.value;
    con.currentValueJob.textContent = con.jobInput.value;

    closePopup();
}

function clearInput () {
  document.forms['form-add-place'].reset();
}

function addCardHandler (evt) {
  evt.preventDefault();

  const newItem = {
    name: con.newPlace.value,
    link: con.newImg.value
  }

  const card = new Card(newItem, con.cardTemplate, baseFunctionsForCard);
  card.renderCard();
  closePopup();
  clearInput();
}

con.btnEdit.addEventListener('click', () => {
  openPopup(con.popupEditProfile);
  addInfoForm();
});
con.btnAddCard.addEventListener('click', () => openPopup(con.popupAddCard));
con.btnCloseFormProfile.addEventListener('click', closePopup);
con.btnCloseFormAddCard.addEventListener('click', closePopup);
con.popupEditProfile.addEventListener('submit', formSubmitHandler);
con.popupEditProfile.addEventListener('click', closePopupByOutsideZone);
con.popupAddCard.addEventListener('submit', (evt) => {
  addCardHandler(evt)
  const addCardForm = document.forms['form-add-place'];
  const btnSubmit = addCardForm.querySelector('.popup__btn');
  const validator = new FormValidator(con.validationConfig, addCardForm);
  validator.toggleBtnState(btnSubmit, false);
})
con.popupAddCard.addEventListener('click', closePopupByOutsideZone);
