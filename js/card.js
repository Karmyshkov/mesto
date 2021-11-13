import * as con from '../js/constants.js';

export class Card {
	constructor (data, template, func) {
		this.img = data.link;
		this.title = data.name;
		this.template = template;
    this._openPopup = func.openPopup;
    this._closePopup = func.closePopup;
    this._closeByEscape = func.closeByEscape;
    this._closePopupByOutsideZone = func.closePopupByOutsideZone;
    this._deleteCard = func.deleteCard;
    this._likeCard = func.likeCard;
	}

	_setAddEventListener (elem) {
		con.btnCloseFormMore.addEventListener('click', this._closePopup);
    elem.addEventListener('click', (evt) => {
      const currentElement = evt.target.parentElement;
      this._openPopupImg(currentElement);
    })
    con.popupMoreCard.addEventListener('click', this._closePopupByOutsideZone);
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

	createCard () {
    const cardTemplate = document.querySelector(this.template);
		const newCard = cardTemplate.content.cloneNode(true);
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
}
