import Popup from '../components/Popup.js';

export const loader = (isLoader, popupSection) => {
    const popup = document.querySelector(popupSection);
    const btn = popup.querySelector('.popup__btn');
  if (isLoader) {
    btn.textContent = 'Сохранение...';
  } else {
    btn.textContent = 'Сохраненить';
    Popup.closePopup(popup);
  }
}
