class Card {
    constructor (img, title, template) {
        this.img = img;
        this.title = title;
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
}