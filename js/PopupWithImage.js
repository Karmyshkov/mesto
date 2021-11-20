import * as con from '../js/constants.js';

export default class PopupWithImage extends Popup {
  openPopup (elem) {
    super.openPopup(con.popupMoreCard);

    const currentImg = elem.querySelector('.card__img').src;
    const currentText = elem.querySelector('.card__title').textContent;
    const popupImg = con.popupMoreCard.querySelector('.popup__img');
    const popupText = con.popupMoreCard.querySelector('.popup__text');

    popupImg.src = currentImg;
    popupImg.alt = `Фото из ${currentText}`;
    popupText.textContent = currentText;
  }
}
