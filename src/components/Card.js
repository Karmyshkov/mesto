export default class Card {

	constructor({getInfoCard, addLikeHandler, deleteLikeHandler, data, userId}, template, openPopupImg) {
		this._template = template;
    this.element = null;
    this.btnLike = null;
    this.btnDelete = null;
    this.countLikesText = null;
    this.img = data.link;
		this.title = data.name;
    this.countLikes = data.likes.length;
    this.likes = data.likes;
    this.cardId = data._id;
    this.userId = userId;
    this.ownerId = data.owner._id;
    this._openPopupImg = openPopupImg;
    this._getInfoCard = getInfoCard;
    this._addLikeHandler = addLikeHandler;
    this._deleteLikeHandler = deleteLikeHandler;
  }

	_setEventListener() {
    this._setLikeCard();
    this._addDeleteBtn();
    this.element.querySelector('.card__img').addEventListener('click', () => this._openPopupImg({img: this.img, text: this.title}));
    this.btnLike.addEventListener('click',  () => this._toggleLikeBtn());
    this.btnDelete.addEventListener('click', () => this._getInfoCard({id: this.cardId, card: this.btnDelete}));
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._template);
		const newCard = cardTemplate.content.cloneNode(true);
    return newCard;
  }

  _deleteCard() {
    this.btnDelete.addEventListener('click', function (evt) {
      console.log('asd')
      const currentElement = evt.target;
      currentElement.parentElement.remove();
    });
  }

  static deleteCard(btnDelete) {
    btnDelete.closest('.card').remove();
  }

  _setLikeCard() {
    if (this.likes.some(elem => elem._id === this.userId)) {
      this.btnLike.classList.add('card__btn_active');
    }
  }

  _toggleLikeBtn() {
    if (!this.btnLike.classList.contains('card__btn_active')) {
      this._addLikeHandler(this.cardId)
        .then(dataLikes => {
          this.likes = dataLikes.likes;
          this.btnLike.classList.add('card__btn_active');
          this.countLikesText.textContent = dataLikes.likes.length;
        })
        .catch(error => console.log(`Error: ${error}`))
    } else {
      this._deleteLikeHandler(this.cardId)
        .then(dataLikes => {
          this.likes = dataLikes.likes;
          this.btnLike.classList.remove('card__btn_active');
          this.countLikesText.textContent = dataLikes.likes.length;
        })
        .catch(error => console.log(`Error: ${error}`))
    }
  }

  _addDeleteBtn() {
    if (this.userId === this.ownerId) {
      this.btnDelete.classList.add('card__btn_state_active');
    }
  }

	createCard() {
    const newCard = this._getTemplate();

    this.element = newCard;
    this.btnLike = newCard.querySelector('.card__btn_type_like');
    this.btnDelete = newCard.querySelector('.card__btn_type_delete');
    this.countLikesText = newCard.querySelector('.card__count');

		const cardTitle = newCard.querySelector('.card__title');
		const cardImg = newCard.querySelector('.card__img');
    const countLikes = newCard.querySelector('.card__count');

		cardTitle.textContent = this.title;
		cardImg.src = this.img;
		cardImg.alt = `Фото из ${this.title}`;

    countLikes.textContent = this.countLikes;

		this._setEventListener();

		return newCard;
	}
}
