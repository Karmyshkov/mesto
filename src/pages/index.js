import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import * as con from '../utils/constants.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-30',
  headers: {
    authorization: '8c883974-19a7-405e-97be-4a70edef35b8',
    'Content-Type': 'application/json'
  }
});

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
]).then(([user, cards]) => {
  userInfo.setUserInfo(user);
  userInfo.setAvatar(user);
  cards.forEach(card => section.renderer(card));
})

const openPopupImg = (data) => {
  popupImage.openPopup(data);
}

function createCard (newItem) {
  const user = userInfo.getUserInfo();
  const card = new Card({
    btnDeleteCardHandler: (cardId) => {
      api.deleteCard(cardId)
        .catch(error => console.log(error))
    },
    addLikeHandler: (cardId) => {
      api.addLikeCard(cardId)
        .then(cardData => console.log(cardData))
        .catch(error => console.log(error))
    },
    deleteLikeHandler: (cardId) => {
      api.deleteLikeCard(cardId)
        .catch(error => console.log(error))
    },
    data: newItem, userId: user.id
  }, con.validationConfig.cardTemplate, openPopupImg);
  return card.createCard();
}

const section = new Section({
  renderer: (item) => {
    const card = createCard(item);
    section.addItem(card);
  }
}, con.cardList);

const addFormValidator = new FormValidator(con.validationConfig, con.addCardForm);
addFormValidator.enableValidation();
const profileFormValidator = new FormValidator(con.validationConfig, con.profileCardForm);
profileFormValidator.enableValidation();
const editAvatarFormValidator = new FormValidator(con.validationConfig, con.editAvatarForm);
editAvatarFormValidator.enableValidation();

const userInfo = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');

const popupImage = new PopupWithImage('.popup_type_more');
popupImage.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', {
  submitHandler: (user) => {
    api.changeUserInfo({name: user['user-name'], about: user['user-job']})
      .then(user => userInfo.setUserInfo(user))
      .catch(error => console.log(error))
  }
})
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_type_add-card', {
  submitHandler: (data) => {
    api.addNewCard({name: data['new-place'], link: data['new-img']})
      .then(dataCard => {
        const card = createCard(dataCard);
        section.addItem(card);
      })
      .catch(error => console.log(error))
  }
})
popupAddCard.setEventListeners();

const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', {
  submitHandler: (urlImg) => {
    api.changeUserAvatar(urlImg)
      .catch(error => console.log(error))
  }
})
popupEditAvatar.setEventListeners();

con.btnEdit.addEventListener('click', () => {
  popupEditProfile.openPopup();
  const user = userInfo.getUserInfo();
  con.nameInput.value = user.name;
  con.jobInput.value = user.descr;
})

con.btnAddCard.addEventListener('click', () => {
  addFormValidator.toggleBtnState(con.btnSubmit, false);
  popupAddCard.openPopup();
})

con.btnEditAvatar.addEventListener('click', () => {
  popupEditAvatar.openPopup();
})
