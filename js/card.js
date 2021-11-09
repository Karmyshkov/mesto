import {cardList} from '../js/constants.js';

export class Card {
    constructor (data, template) {
        this.img = data.link;
        this.title = data.name;
        this.isLike = false;
        this.template = template;
    }

    _createCard () {
        const newCard = this.template.content.cloneNode(true);
        const cardTitle = newCard.querySelector('.card__title');
        const cardImg = newCard.querySelector('.card__img');

        cardTitle.textContent = this.title;
        cardImg.src = this.img;
        cardImg.alt = `Фото из ${this.title}`;

        return newCard;
    }

    renderCard () {
        const cards = this._createCard();
        cardList.prepend(cards)
    }
}

