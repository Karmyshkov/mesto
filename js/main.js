const cardTemplate = document.querySelector('.card-template');
const cardList = document.querySelector('.places__cards');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popuMoreCard = document.querySelector('.popup_type_more');
const formElementArr = document.querySelectorAll('.popup__container');
const nameInput = document.getElementById('userName');
const jobInput = document.getElementById('userJob');
const btnEdit = document.querySelector('.profile__edit');
const btnAddCard = document.querySelector('.profile__btn');
const btnCloseEditForm = popupEditProfile.querySelector('.popup__close');
const btnCloseAddCardForm = popupAddCard.querySelector('.popup__close');
const currentValueName = document.querySelector('.profile__name');
const currentValueJob = document.querySelector('.profile__description');
const newPlace = document.getElementById('newPlace');
const newImg = document.getElementById('newImg');
const popupMore = document.querySelector('.popup_type_more');

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

// удалять слушатели

function addInfoForm () {
  nameInput.value  = currentValueName.textContent;
  jobInput.value = currentValueJob.textContent;
}

function openForm (element, fnc = null) {
  element.classList.add('popup_opened');
  if (typeof fnc !== "object") fnc();
}

function closePopap () {
  const activePopup = document.querySelector('.popup_opened')
  if (activePopup) activePopup.classList.remove('popup_opened');
}

function renderCard (obj) {
  const newCard = cardTemplate.content.cloneNode(true);

  newCard.querySelector('.card__img').src = obj.link;
  newCard.querySelector('.card__title').textContent = obj.name;

  const btnLike = newCard.querySelector('.card__btn_type_like');
  const btnDelete = newCard.querySelector('.card__btn_type_delete');
  const cardImg = newCard.querySelector('.card__img');
  
  cardList.append(newCard);

  btnLike.addEventListener('click', function () {
    this.classList.toggle('card__btn_active');
  });

  btnDelete.addEventListener('click', function (evt) {
    const currentElement = evt.target;
    currentElement.parentElement.remove();
  });

  cardImg.addEventListener('click', function (evt) {
    const currentElement = evt.target.parentElement;
    const currentImg = currentElement.querySelector('.card__img').src;
    const currentText = currentElement.querySelector('.card__title').textContent;
    popupMore.querySelector('.popap__img').src = currentImg;
    popupMore.querySelector('.popap__text').textContent = currentText;
    openForm(popupMore);
  })
}

function addCardHandler (evt) {
  evt.preventDefault();

  const newCard = cardTemplate.content.cloneNode(true);

  let cardValue = {
    name: newPlace.value,
    link: newImg.value
  }

  newCard.querySelector('.card__img').src = cardValue.link;
  newCard.querySelector('.card__title').textContent = cardValue.name;

  cardList.prepend(newCard);

  closePopap();
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    currentValueName.textContent = nameInput.value;
    currentValueJob.textContent = jobInput.value;

    closePopap();
}

btnEdit.addEventListener('click', () => openForm(popupEditProfile, addInfoForm));
btnCloseEditForm.addEventListener('click', closePopap);
btnAddCard.addEventListener('click', () => openForm(popupAddCard));
btnCloseAddCardForm.addEventListener('click', closePopap);
popuMoreCard.addEventListener('click', closePopap);

formElementArr.forEach(item => {
  if (item.parentElement.classList[1] === 'popup_type_edit-profile') {
    item.addEventListener('submit', formSubmitHandler);
  } else {
    item.addEventListener('submit', addCardHandler);
  }
});

initialCards.map(renderCard);