const cardTemplate = document.querySelector('.card-template');
const cardList = document.querySelector('.places__cards');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupMoreCard = document.querySelector('.popup_type_more');
const formElements = document.querySelectorAll('.popup__container');
const nameInput = document.getElementById('user-name');
const jobInput = document.getElementById('user-job');
const btnEdit = document.querySelector('.profile__edit');
const btnAddCard = document.querySelector('.profile__btn');
const btnCloseFormProfile = popupEditProfile.querySelector('.popup__close');
const btnCloseFormAddCard = popupAddCard.querySelector('.popup__close');
const currentValueName = document.querySelector('.profile__name');
const currentValueJob = document.querySelector('.profile__description');
const newPlace = document.getElementById('new-place');
const newImg = document.getElementById('new-img');

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

function addInfoForm () {
  nameInput.value  = currentValueName.textContent;
  jobInput.value = currentValueJob.textContent;
}

function openForm (element, fnc = null) {
  element.classList.add('popup_opened');
  if (typeof fnc !== 'object') fnc();
}

function closePopup () {
  const activePopup = document.querySelector('.popup_opened');
  if (activePopup) activePopup.classList.remove('popup_opened');
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

function formSubmitHandler (evt) {
    evt.preventDefault();

    currentValueName.textContent = nameInput.value;
    currentValueJob.textContent = jobInput.value;

    closePopup();
}

function openPopupImg (elem) {
  const currentImg = elem.querySelector('.card__img').src;
  const currentText = elem.querySelector('.card__title').textContent;
  const popupImg = popupMoreCard.querySelector('.popup__img');
  const popupText = popupMoreCard.querySelector('.popup__text');

  popupImg.src = currentImg;
  popupImg.alt = `Фото из ${currentText}`;
  popupText.textContent = currentText;
}

function setListenerImg (elem) {
  elem.addEventListener('click', function (evt) {
    const currentElement = evt.target.parentElement;
    
    openPopupImg(currentElement);
    
    openForm(popupMoreCard);
  })
}

function createCard (dataCard){
  const newCard = cardTemplate.content.cloneNode(true);
  
  const cardTitle = newCard.querySelector('.card__title');
  const cardImg = newCard.querySelector('.card__img');

  cardImg.src = dataCard.link;
  cardImg.alt = `Фото из ${dataCard.name}`;
  cardTitle.textContent = dataCard.name;

  setListenerImg(cardImg);
  likeCard(newCard);
  deleteCard(newCard);

  return newCard;
}

function renderCard (cards) {
  cards.forEach(item => cardList.prepend(item));
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

  cardList.prepend(createCard(newItem));

  closePopup();

  clearInput();
}

const cards = initialCards.map(createCard);

renderCard(cards);

btnEdit.addEventListener('click', () => openForm(popupEditProfile, addInfoForm));
btnAddCard.addEventListener('click', () => openForm(popupAddCard));
btnCloseFormProfile.addEventListener('click', closePopup);
btnCloseFormAddCard.addEventListener('click', closePopup);
popupMoreCard.addEventListener('click', closePopup);

formElements.forEach(item => {
  if (item.parentElement.classList.contains('popup_type_edit-profile')) {
    item.addEventListener('submit', formSubmitHandler);
  } else {
    item.addEventListener('submit', addCardHandler)
  }
});