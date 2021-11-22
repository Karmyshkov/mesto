import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import * as con from '../utils/constants.js';

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

const userInfo = new UserInfo();

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
})

const popupAddCard = new PopupWithForm('.popup_type_add-card', {
  submitHandler: () => {
    const newItem = {
      name: con.newPlace.value,
      link: con.newImg.value
    }

    const card = new Card(newItem, con.validationConfig.cardTemplate, functions);
    const newCard = card.createCard();

    const section = new Section({
      items: {},
      renderer: () => {}
    },
    con.cardList
    )
    section.addItem(newCard);
  }
})

con.btnEdit.addEventListener('click', () => {
  popupEditProfile.openPopup();
  popupEditProfile.setEventListeners();
  const newUser = {
    name: con.currentValueName.textContent,
    descr: con.currentValueJob.textContent
  }
  userInfo.setUserInfo(newUser);
  const user = userInfo.getUserInfo();
  con.nameInput.value  = user.name;
  con.jobInput.value = user.descr;
})

con.btnAddCard.addEventListener('click', () => {
  const validator = new FormValidator(con.validationConfig, con.addCardForm);
  validator.toggleBtnState(con.btnSubmit, false);
  popupAddCard.openPopup();
  popupAddCard.setEventListeners();
})

const functions = {
  deleteCard,
  likeCard,
  openPopupImg
}

initialCards.forEach(elem => {
  const card = new Card(elem, con.validationConfig.cardTemplate, functions);
  const cards = card.createCard();

  const section = new Section({
    items: cards,
    renderer: (cards) => {
      con.cardList.prepend(cards);
    }
  },
  con.cardList
  )
  section.renderer(cards);
})

const forms = document.querySelectorAll(con.validationConfig.formSelector);
forms.forEach(elem => {
  const formValidator = new FormValidator(con.validationConfig, elem);
  formValidator.enableValidation();
})

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
