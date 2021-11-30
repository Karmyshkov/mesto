import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {

  constructor(sectionPopup) {
    super(sectionPopup);
    this.img = this.popup.querySelector('.popup__img');
    this.text = this.popup.querySelector('.popup__text');
  }

  openPopup(data) {
    super.openPopup();

    this.img.src = data.img;
    this.img.alt = `Фото из ${data.text}`;
    this.text.textContent = data.text;
  }
}
