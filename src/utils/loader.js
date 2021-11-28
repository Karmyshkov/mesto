import PopupWithForm from '../components/PopupWithForm.js';

export const loader = (isLoader, popupSection) => {
    const popup = document.querySelector(popupSection);
    const formName = popup.querySelector('.popup__form').name;
    const btn = popup.querySelector('.popup__btn');
  if (isLoader) {
    btn.textContent = 'Сохранение...';
  } else {
    btn.textContent = 'Сохраненить';
    PopupWithForm.closePopup(popup, formName);
  }
}
