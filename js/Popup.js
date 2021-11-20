class Popup {
  constructor (sectionPopup) {
    this.sectionPopup = sectionPopup;
  }

  openPopup () {
    this.sectionPopup.classList.add('popup_opened');
    document.addEventListener('keydown', this.closeByEscape);
  }

  closePopup () {
    const activePopup = document.querySelector('.popup_opened');
    if (activePopup) activePopup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.closeByEscape);
  }

  closeByEscape(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }
}
