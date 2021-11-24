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

const addFormValidator = new FormValidator(con.validationConfig, con.addCardForm);
addFormValidator.enableValidation();
const profileFormValidator = new FormValidator(con.validationConfig, con.profileCardForm);
profileFormValidator.enableValidation();

const userInfo = new UserInfo('.profile__name', '.profile__description');

const popupImage = new PopupWithImage('.popup_type_more');
popupImage.setEventListeners();

const openPopupImg = (data) => {
  popupImage.openPopup(data);
}

const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', {
  submitHandler: (user) => {
    userInfo.setUserInfo(user);
  }
})

const createCard = (newItem) => {
  const card = new Card(newItem, con.validationConfig.cardTemplate, openPopupImg);
  return card.createCard();
}

const section = new Section({items: {}, renderer: () => {}}, con.cardList);

const popupAddCard = new PopupWithForm('.popup_type_add-card', {
  submitHandler: (data) => {
    const newItem = {
      name: data['new-place'],
      link: data['new-img']
    }

    const card = createCard(newItem);

    section.addItem(card);
  }
})
popupAddCard.setEventListeners();

con.btnEdit.addEventListener('click', () => {
  popupEditProfile.openPopup();
  popupEditProfile.setEventListeners();
  const user = userInfo.getUserInfo();
  con.nameInput.value = user.name;
  con.jobInput.value = user.descr;
})

con.btnAddCard.addEventListener('click', () => {
  addFormValidator.toggleBtnState(con.btnSubmit, false);
  popupAddCard.openPopup();
})

initialCards.forEach(elem => {
  const card = new Card(elem, con.validationConfig.cardTemplate, openPopupImg);
  const cards = card.createCard();

  const section = new Section({items: cards, renderer: () => {}}, con.cardList);
  section.addItem(cards);
})
