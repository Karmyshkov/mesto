function closePopupByOutsideZone(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closeByEscape () {
  const keyNum = window.event.keyCode;
  if (keyNum === 27) closePopup();
}


function addInfoForm () {
  nameInput.value  = currentValueName.textContent;
  jobInput.value = currentValueJob.textContent;
}

function openPopup (element, fnc = null) {
  element.classList.add('popup_opened');
  if (typeof fnc !== 'object') fnc();
  closePopupByOutsideZone(element);
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

function createPopupImg (elem) {
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
    
    createPopupImg(currentElement);
    
    openPopup(popupMoreCard);
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

btnEdit.addEventListener('click', () => openPopup(popupEditProfile, addInfoForm));
btnAddCard.addEventListener('click', () => openPopup(popupAddCard));
btnCloseFormProfile.addEventListener('click', closePopup);
btnCloseFormAddCard.addEventListener('click', closePopup);
popupMoreCard.addEventListener('click', closePopup);
popupEditProfile.addEventListener('submit', formSubmitHandler);
popupAddCard.addEventListener('submit', addCardHandler)
document.addEventListener('keydown', closeByEscape);