const cardTemplate = document.querySelector('.card-template');
const cardList = document.querySelector('.places__cards');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupMoreCard = document.querySelector('.popup_type_more');
const nameInput = document.getElementById('user-name');
const jobInput = document.getElementById('user-job');
const btnEdit = document.querySelector('.profile__edit');
const btnAddCard = document.querySelector('.profile__btn');
const btnCloseFormProfile = popupEditProfile.querySelector('.popup__close');
const btnCloseFormAddCard = popupAddCard.querySelector('.popup__close');
const btnCloseFormMore = popupMoreCard.querySelector('.popup__close');
const currentValueName = document.querySelector('.profile__name');
const currentValueJob = document.querySelector('.profile__description');
const newPlace = document.getElementById('new-place');
const newImg = document.getElementById('new-img');