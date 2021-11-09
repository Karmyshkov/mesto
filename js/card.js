import * as constants from '../js/constants.js';

export class Card {
	constructor (data, template) {
		this.img = data.link;
		this.title = data.name;
		this.isLike = false;
		this.template = template;
	}

	_setAddEventListener () {
		constants.btnEdit.addEventListener('click', () => {
			this._openPopup(constants.popupEditProfile);
			// addInfoForm();
		});
		constants.btnAddCard.addEventListener('click', () => this._openPopup(constants.popupAddCard));
    constants.btnCloseFormProfile.addEventListener('click', this._closePopup);
    constants.btnCloseFormAddCard.addEventListener('click', this._closePopup);
    constants.btnCloseFormMore.addEventListener('click', this._closePopup);
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

	_createCard () {
		const newCard = this.template.content.cloneNode(true);
		const cardTitle = newCard.querySelector('.card__title');
		const cardImg = newCard.querySelector('.card__img');

		cardTitle.textContent = this.title;
		cardImg.src = this.img;
		cardImg.alt = `Фото из ${this.title}`;
		
		this._setAddEventListener();
		this._deleteCard(newCard);

		return newCard;
	}

	renderCard () {
		const cards = this._createCard();
		constants.cardList.prepend(cards)
	}
}