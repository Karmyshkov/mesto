function closePopupByOutsideZone(evt) {
  const event = evt.target;
  if (event.parentElement.classList.contains('body')) closePopup();
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function addInfoForm () {
  nameInput.value  = currentValueName.textContent;
  jobInput.value = currentValueJob.textContent;
}

function openPopup (element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closePopup () {
  const activePopup = document.querySelector('.popup_opened');
  if (activePopup) activePopup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape); 
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

  openPopup(popupMoreCard);
}

function setListenerImg (elem) {
  elem.addEventListener('click', function (evt) {
    const currentElement = evt.target.parentElement;
    
    openPopupImg(currentElement);
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

btnEdit.addEventListener('click', () => {
  openPopup(popupEditProfile);
  addInfoForm();
});
btnAddCard.addEventListener('click', () => openPopup(popupAddCard));
btnCloseFormProfile.addEventListener('click', closePopup);
btnCloseFormAddCard.addEventListener('click', closePopup);
btnCloseFormMore.addEventListener('click', closePopup);
popupMoreCard.addEventListener('click', closePopupByOutsideZone);
popupEditProfile.addEventListener('submit', formSubmitHandler);
popupEditProfile.addEventListener('click', closePopupByOutsideZone);
popupAddCard.addEventListener('submit', (evt) => {
  addCardHandler(evt, validationConfig)
  const addCardForm = document.forms['form-add-place'];
  const btnSubmit = addCardForm.querySelector('.popup__btn');
  toggleBtnState(btnSubmit, false, validationConfig);
})
popupAddCard.addEventListener('click', closePopupByOutsideZone);