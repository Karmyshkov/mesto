import * as con from '../js/index.js';

export class Card {
	constructor (data, template) {
		this.img = data.link;
		this.title = data.name;
		this.template = template;
	}

	_setAddEventListener (elem) {
		con.btnCloseFormMore.addEventListener('click', this._closePopup);
    elem.addEventListener('click', (evt) => {
      const currentElement = evt.target.parentElement;
      this._openPopupImg(currentElement);
    })
    con.popupMoreCard.addEventListener('click', this._closePopupByOutsideZone);
	}

  _closePopupByOutsideZone = (evt) => {
    const event = evt.target;
    if (event.parentElement.classList.contains('body')) this._closePopup();
  }

  _closeByEscape = (evt) => {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      this._closePopup(openedPopup);
    }
  }

	_openPopup (elem) {
		elem.classList.add('popup_opened');
		document.addEventListener('keydown', this._closeByEscape);
	}

	_closePopup () {
		const activePopup = document.querySelector('.popup_opened');
		if (activePopup) activePopup.classList.remove('popup_opened');
		document.removeEventListener('keydown', this._closeByEscape); 
	}

	_deleteCard (elem) {
		const btnDelete = elem.querySelector('.card__btn_type_delete');

		btnDelete.addEventListener('click', function (evt) {
		  const currentElement = evt.target;
		  currentElement.parentElement.remove();
		});
	}

  _openPopupImg (elem) {
    const currentImg = elem.querySelector('.card__img').src;
    const currentText = elem.querySelector('.card__title').textContent;
    const popupImg = con.popupMoreCard.querySelector('.popup__img');
    const popupText = con.popupMoreCard.querySelector('.popup__text');
  
    popupImg.src = currentImg;
    popupImg.alt = `Фото из ${currentText}`;
    popupText.textContent = currentText;
  
    this._openPopup(con.popupMoreCard);
  }

  _likeCard (elem) {
    const btnLike = elem.querySelector('.card__btn_type_like');

    btnLike.addEventListener('click', function () {
      this.classList.toggle('card__btn_active');
    });
  }

	_createCard () {
		const newCard = this.template.content.cloneNode(true);
		const cardTitle = newCard.querySelector('.card__title');
		const cardImg = newCard.querySelector('.card__img');

		cardTitle.textContent = this.title;
		cardImg.src = this.img;
		cardImg.alt = `Фото из ${this.title}`;
		
		this._setAddEventListener(cardImg);
    this._likeCard(newCard);
		this._deleteCard(newCard);

		return newCard;
	}

	renderCard () {
		const cards = this._createCard();
		con.cardList.prepend(cards)
	}
}