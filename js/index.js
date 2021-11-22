import * as con from '../js/constants.js';
import Card from '../js/Card.js';
import FormValidator from '../js/FormValidator.js';
import PopupWithForm from '../js/PopupWithForm.js';
import PopupWithImage from '../js/PopupWithImage.js';

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

const popupImage = new PopupWithImage('.popup_type_more');
popupImage.setEventListeners();

const openPopupImg = (data) => {
  popupImage.openPopup(data);
}

const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', {
  submitHandler: () => {
    con.currentValueName.textContent = con.nameInput.value;
    con.currentValueJob.textContent = con.jobInput.value;
  }
});

const popupAddCard = new PopupWithForm('.popup_type_add-card', {
  submitHandler: () => {
    const newItem = {
      name: con.newPlace.value,
      link: con.newImg.value
    }

    const card = new Card(newItem, con.validationConfig.cardTemplate, functions);
    const newCard = card.createCard();
    renderCard(newCard);
  }
});

con.btnEdit.addEventListener('click', () => {
  popupEditProfile.openPopup();
  popupEditProfile.setEventListeners();
});
con.btnAddCard.addEventListener('click', () => {
  popupAddCard.openPopup();
  popupAddCard.setEventListeners();
});

const functions = {
  deleteCard,
  likeCard,
  openPopupImg
}

initialCards.forEach(elem => {
  const card = new Card(elem, con.validationConfig.cardTemplate, functions);
  const cards = card.createCard();
  renderCard(cards);
})

const forms = document.querySelectorAll(con.validationConfig.formSelector);
forms.forEach(elem => {
  const formValidator = new FormValidator(con.validationConfig, elem);
  formValidator.enableValidation();
})

function renderCard (cards) {
  con.cardList.prepend(cards);
}

function likeCard (elem) {
  const btnLike = elem.querySelector('.card__btn_type_like');

  btnLike.addEventListener('click', function () {
    this.classList.toggle('card__btn_active');
  });
}

function deleteCard (elem) {
  const btnDelete = elem.querySelector('.card__btn_type_delete');

  btnDelete.addEventListener('click', function (evt) {
    const currentElement = evt.target;
    currentElement.parentElement.remove();
  });
}

// function closePopupByOutsideZone(evt) {
//   const event = evt.target;
//   if (event.parentElement.classList.contains('body')) closePopup();
// }

// function closeByEscape(evt) {
//   if (evt.key === 'Escape') {
//     closePopup();
//   }
// }

// function addInfoForm () {
//   con.nameInput.value  = con.currentValueName.textContent;
//   con.jobInput.value = con.currentValueJob.textContent;
// }

// открытие попапа

// function openPopup (element) {
//   element.classList.add('popup_opened');
//   document.addEventListener('keydown', closeByEscape);
// }

// закрытие попапа

// function closePopup () {
//   const activePopup = document.querySelector('.popup_opened');
//   if (activePopup) activePopup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeByEscape);
// }

// добавление текущей информации в попап редактирования пользователя

// function formSubmitHandler (evt) {
//     evt.preventDefault();

//     con.currentValueName.textContent = con.nameInput.value;
//     con.currentValueJob.textContent = con.jobInput.value;

//     closePopup();
// }

// очистка полей формы

// function clearInput () {
//   document.forms['form-add-place'].reset();
// }

// создание карточки

// function addCardHandler (evt) {
//   evt.preventDefault();

//   const newItem = {
//     name: con.newPlace.value,
//     link: con.newImg.value
//   }

//   const card = new Card(newItem, con.validationConfig.cardTemplate, baseFunctionsForCard);
//   const newCard = card.createCard();
//   renderCard(newCard);
//   closePopup();
//   clearInput();
// }

// con.btnEdit.addEventListener('click', () => {
//   openPopup(con.popupEditProfile);
//   addInfoForm();
// });
// con.btnAddCard.addEventListener('click', () => openPopup(con.popupAddCard));
// con.btnCloseFormProfile.addEventListener('click', closePopup);
// con.btnCloseFormAddCard.addEventListener('click', closePopup);
// con.popupEditProfile.addEventListener('submit', formSubmitHandler);
// con.popupEditProfile.addEventListener('click', closePopupByOutsideZone);
// con.popupAddCard.addEventListener('submit', (evt) => {
//   addCardHandler(evt)
//   const addCardForm = document.forms['form-add-place'];
//   const btnSubmit = addCardForm.querySelector('.popup__btn');
//   const validator = new FormValidator(con.validationConfig, addCardForm);
//   validator.toggleBtnState(btnSubmit, false);
// })
// con.popupAddCard.addEventListener('click', closePopupByOutsideZone);
// con.btnCloseFormMore.addEventListener('click', closePopup);
// con.popupMoreCard.addEventListener('click', closePopupByOutsideZone);
