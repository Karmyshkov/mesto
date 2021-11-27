export default class Card {

	constructor({btnLikeHandler, data, userId}, template, openPopupImg) {
		this.img = data.link;
		this.title = data.name;
    this.countLikes = data.likes.length;
    this.cardId = data._id;
    this.userId = userId;
    this.ownerId = data.owner._id;
		this._template = template;
    this._openPopupImg = openPopupImg;
    this._btnLikeHandler = btnLikeHandler;
	}

	_setEventListener(elem) {
    this._likeCard(elem);
		this._deleteCard(elem);
    this._addDeleteBtn(elem);
    elem.querySelector('.card__img').addEventListener('click', () => this._openPopupImg({img: this.img, text: this.title}));
    elem.querySelector('.card__btn_type_delete').addEventListener('click', () => this._btnLikeHandler(this.cardId));
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._template);
		const newCard = cardTemplate.content.cloneNode(true);
    return newCard;
  }

  _deleteCard(elem) {
    const btnDelete = elem.querySelector('.card__btn_type_delete');

    btnDelete.addEventListener('click', function (evt) {
      const currentElement = evt.target;
      currentElement.parentElement.remove();
    });
  }

  _likeCard(elem) {
    const btnLike = elem.querySelector('.card__btn_type_like');

    btnLike.addEventListener('click', function () {
      this.classList.toggle('card__btn_active');
    });
  }

  _addDeleteBtn(elem) {
    if (this.userId === this.ownerId) {
      elem.querySelector('.card__btn_type_delete').classList.add('card__btn_state_active');
    }
  }

	createCard() {
    const newCard = this._getTemplate();
		const cardTitle = newCard.querySelector('.card__title');
		const cardImg = newCard.querySelector('.card__img');
    const countLikes = newCard.querySelector('.card__count');

		cardTitle.textContent = this.title;
		cardImg.src = this.img;
		cardImg.alt = `Фото из ${this.title}`;
    countLikes.textContent = this.countLikes;

		this._setEventListener(newCard);

		return newCard;
	}
}
