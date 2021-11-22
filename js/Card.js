export default class Card {

	constructor (data, template, {deleteCard, likeCard, openPopupImg}) {
		this.img = data.link;
		this.title = data.name;
		this.template = template;
    this._deleteCard = deleteCard;
    this._likeCard = likeCard;
    this._openPopupImg = openPopupImg;
	}

	_setEventListener (elem) {
    this._likeCard(elem);
		this._deleteCard(elem);
    elem.querySelector('.card__img').addEventListener('click', () => this._openPopupImg({img: this.img, text: this.title}));
  }

  _getTemplate () {
    const cardTemplate = document.querySelector(this.template);
		const newCard = cardTemplate.content.cloneNode(true);
    return newCard;
  }

	createCard () {
    const newCard = this._getTemplate();
		const cardTitle = newCard.querySelector('.card__title');
		const cardImg = newCard.querySelector('.card__img');

		cardTitle.textContent = this.title;
		cardImg.src = this.img;
		cardImg.alt = `Фото из ${this.title}`;

		this._setEventListener(newCard);

		return newCard;
	}
}
