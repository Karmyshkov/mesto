import * as con from '../js/constants.js';

export class Card {
	constructor (data, template) {
		this.img = data.link;
		this.title = data.name;
		this.isLike = false;
		this.template = template;
	}

	_setAddEventListener (elem) {
		con.btnEdit.addEventListener('click', () => {
			this._openPopup(con.popupEditProfile);
			// addInfoForm();
		});
		con.btnAddCard.addEventListener('click', () => this._openPopup(con.popupAddCard));
		con.btnCloseFormProfile.addEventListener('click', this._closePopup);
		con.btnCloseFormAddCard.addEventListener('click', this._closePopup);
		con.btnCloseFormMore.addEventListener('click', this._closePopup);
    elem.addEventListener('click', (evt) => {
      const currentElement = evt.target.parentElement;
      this._openPopupImg(currentElement);
    })
	}

	_openPopup (elem) {
		elem.classList.add('popup_opened');
		//document.addEventListener('keydown', closeByEscape);
	}

	_closePopup () {
		const activePopup = document.querySelector('.popup_opened');
		if (activePopup) activePopup.classList.remove('popup_opened');
		// document.removeEventListener('keydown', closeByEscape); 
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

	_createCard () {
		const newCard = this.template.content.cloneNode(true);
		const cardTitle = newCard.querySelector('.card__title');
		const cardImg = newCard.querySelector('.card__img');

		cardTitle.textContent = this.title;
		cardImg.src = this.img;
		cardImg.alt = `Фото из ${this.title}`;
		
		this._setAddEventListener(cardImg);
		this._deleteCard(newCard);

		return newCard;
	}

	renderCard () {
		const cards = this._createCard();
		con.cardList.prepend(cards)
	}
}
