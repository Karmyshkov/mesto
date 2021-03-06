export const cardTemplate = document.querySelector('.card-template');
export const cardList = document.querySelector('.places__cards');
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const popupAddCard = document.querySelector('.popup_type_add-card');
export const popupMoreCard = document.querySelector('.popup_type_more');
export const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
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
export const addCardForm = document.forms['form-add-place'];
export const profileCardForm = document.forms['form-edit-profile'];
export const editAvatarForm = document.forms['form-new-avatar'];
export const btnSubmitAddForm = addCardForm.querySelector('.popup__btn');
export const btnSubmitEditAvatar = editAvatarForm.querySelector('.popup__btn');
export const btnEditAvatar = document.querySelector('.profile__btn-avatar');
export const avatarImg = document.querySelector('.profile__avatar');

export const validationConfig = {
  cardTemplate: '.card-template',
  formSelector: '.popup__form',
  formEditNameSelectorEditProfile: 'form-edit-profile',
  formEditNameSelectorAddPlace: 'form-add-place',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_disabled',
  inputErrorClass: 'popup__error',
  errorClass: 'popup__error_invalid'
}
