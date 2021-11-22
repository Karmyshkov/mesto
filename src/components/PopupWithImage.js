import Popup from '../components/Popup.js';
import {popupMoreCard} from '../utils/constants.js';

export default class PopupWithImage extends Popup {

  constructor (sectionPopup) {
    super(sectionPopup);
    this.img = popupMoreCard.querySelector('.popup__img');
    this.text = popupMoreCard.querySelector('.popup__text');
  }

  openPopup (data) {
    super.openPopup();

    this.img.src = data.img;
    this.img.alt = `Фото из ${data.text}`;
    this.text.textContent = data.text;
  }
}
