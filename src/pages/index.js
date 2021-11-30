import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import * as con from '../utils/constants.js';
import {loader} from '../utils/loader.js';

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

let currentIdCard = null;

function createCard (newItem) {
  const user = userInfo.getUserInfo();
  const card = new Card({
    deleteCardHandler: (evt) => {

      const currentElement = evt.target.parentElement;
      popupDeleteCard.openPopup();

      popupDeleteCard.setActionHandler((evt) => {
        evt.preventDefault();

        api.deleteCard(currentIdCard)
          .then(dataCard => {
            console.log(dataCard);
            currentElement.remove();
            popupDeleteCard.closePopup();
          })
          .catch(error => console.log(error))
      })
    },
    getInfoCard: (cardId) => currentIdCard = cardId,
    addLikeHandler: (cardId) => api.addLikeCard(cardId),
    deleteLikeHandler: (cardId) => api.deleteLikeCard(cardId),
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

const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', 'form-edit-profile', {
  submitHandler: (user) => {
    loader(true, '.popup_type_edit-profile');
    api.changeUserInfo({name: user['user-name'], about: user['user-job']})
      .then(user => {
        userInfo.setUserInfo(user)
        popupEditProfile.closePopup();
      })
      .catch(error => console.log(error))
      .finally(() => loader(false, '.popup_type_edit-profile'));
  }
})
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm('.popup_type_add-card', 'form-add-place', {
  submitHandler: (data) => {
    loader(true, '.popup_type_add-card');
    api.addNewCard({name: data['new-place'], link: data['new-img']})
      .then(dataCard => {
        const card = createCard(dataCard);
        section.addItem(card);
        popupAddCard.closePopup();
      })
      .catch(error => console.log(error))
      .finally(() => loader(false, '.popup_type_add-card'));
  }
})
popupAddCard.setEventListeners();

const popupEditAvatar = new PopupWithForm('.popup_type_edit-avatar', 'form-new-avatar', {
  submitHandler: (urlImg) => {
    loader(true, '.popup_type_edit-avatar');
    api.changeUserAvatar(urlImg)
      .then(avatarData => {
        userInfo.setAvatar({avatar: avatarData.avatar})
        popupEditAvatar.closePopup();
      })
      .catch(error => console.log(error))
      .finally(() => loader(false, '.popup_type_edit-avatar'));
  }
})
popupEditAvatar.setEventListeners();

const popupDeleteCard = new PopupConfirm('.popup_type_delete-card');
popupDeleteCard.setEventListeners();

con.btnEdit.addEventListener('click', () => {
  profileFormValidator.toggleBtnState(false);
  profileFormValidator.resetValidation();
  popupEditProfile.openPopup();
  const user = userInfo.getUserInfo();
  con.nameInput.value = user.name;
  con.jobInput.value = user.descr;
})

con.btnAddCard.addEventListener('click', () => {
  addFormValidator.toggleBtnState(false);
  addFormValidator.resetValidation();
  popupAddCard.openPopup();
})

con.btnEditAvatar.addEventListener('click', () => {
  editAvatarFormValidator.toggleBtnState(false);
  editAvatarFormValidator.resetValidation();
  popupEditAvatar.openPopup();
});
