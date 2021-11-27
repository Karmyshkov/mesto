export default class Card {

	constructor({btnDeleteHandler, data, userId}, template, openPopupImg) {
    console.log(data.owner._id)
		this.img = data.link;
		this.title = data.name;
    this.countLikes = data.likes.length;
    this.cardId = data._id;
    this.userId = userId;
    this.ownerId = data.owner._id;
		this._template = template;
    this._openPopupImg = openPopupImg;
    this._btnDeleteHandler = btnDeleteHandler;
	}

	_setEventListener(elem) {
    this._likeCard(elem);
		this._deleteCard(elem);
    this._addDeleteBtn(elem);
    elem.querySelector('.card__img').addEventListener('click', () => this._openPopupImg({img: this.img, text: this.title}));
    elem.querySelector('.card__btn_type_delete').addEventListener('click', () => this._btnDeleteHandler(this.cardId));
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

  _isNullCountLikes() {
    return this.countLikes === null ? 0 : 1;
  }

	createCard() {
    const newCard = this._getTemplate();
		const cardTitle = newCard.querySelector('.card__title');
		const cardImg = newCard.querySelector('.card__img');
    const countLikes = newCard.querySelector('.card__count');

		cardTitle.textContent = this.title;
		cardImg.src = this.img;
		cardImg.alt = `Фото из ${this.title}`;

    if (this._isNullCountLikes()) countLikes.textContent = this.countLikes;

		this._setEventListener(newCard);

		return newCard;
	}
}
