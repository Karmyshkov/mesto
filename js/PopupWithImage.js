import Popup from '../js/Popup.js';
import * as con from '../js/constants.js';

export default class PopupWithImage extends Popup {

  constructor (sectionPopup) {
    super(sectionPopup);
    this.img = con.popupMoreCard.querySelector('.popup__img');
    this.text = con.popupMoreCard.querySelector('.popup__text');
  }

  openPopup (elem) {
    super.openPopup();

    const currentImg = elem.querySelector('.card__img').src;
    const currentText = elem.querySelector('.card__title').textContent;

    this.img.src = currentImg;
    this.img.alt = `Фото из ${currentText}`;
    this.text.textContent = currentText;
  }
}
