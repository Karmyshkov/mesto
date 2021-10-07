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
const btnClose = popupEditProfile.querySelector('.popup__close');
const currentValueName = document.querySelector('.profile__name');
const currentValueJob = document.querySelector('.profile__description');

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
  if (typeof fnc !== "object") fnc();
}

function closePopap () {
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

function addCardHandler (evt) {
  evt.preventDefault();

  const newCard = cardTemplate.content.cloneNode(true);

  let cardValue = {
    name: newPlace.value,
    link: newImg.value
  }

  newCard.querySelector('.card__img').src = cardValue.link;
  newCard.querySelector('.card__title').textContent = cardValue.name;

  likeCard(newCard);
  deleteCard(newCard);

  cardList.prepend(newCard);

  closePopap();
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    currentValueName.textContent = nameInput.value;
    currentValueJob.textContent = jobInput.value;

    closePopap();
}

function renderCard (obj) {
  const newCard = cardTemplate.content.cloneNode(true);
  const cardTitle = newCard.querySelector('.card__title');
  const cardImg = newCard.querySelector('.card__img');

  cardImg.src = obj.link;
  cardImg.alt = obj.name;
  cardTitle.textContent = obj.name;

  likeCard(newCard);
  deleteCard(newCard);
  
  cardList.append(newCard);

  cardImg.addEventListener('click', function (evt) {
    const currentElement = evt.target.parentElement;
    const currentImg = currentElement.querySelector('.card__img').src;
    const currentText = currentElement.querySelector('.card__title').textContent;
    const popapImg = popuMoreCard.querySelector('.popap__img');
    const popapText = popuMoreCard.querySelector('.popap__text');

    popapImg.src = currentImg;
    popapImg.alt = currentText;
    popapText.textContent = currentText;

    openForm(popuMoreCard);
  })
}

btnEdit.addEventListener('click', () => openForm(popupEditProfile, addInfoForm));
btnClose.addEventListener('click', closePopap);
btnAddCard.addEventListener('click', () => openForm(popupAddCard));
btnClose.addEventListener('click', closePopap);
popuMoreCard.addEventListener('click', closePopap);
formElementArr.forEach(item => {
  if (item.parentElement.classList.contains('popup_type_edit-profile')) {
    item.addEventListener('submit', formSubmitHandler);
  } else {
    item.addEventListener('submit', addCardHandler);
  }
});

initialCards.map(renderCard);