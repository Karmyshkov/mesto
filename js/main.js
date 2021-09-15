const body = document.querySelector('.body');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('input[name="userName"]');
const jobInput = document.querySelector('input[name="userJob"]');

const btnEdit = document.querySelector('.profile__edit');
const btnClose = formElement.querySelector('.popup__close');
const btnSave = formElement.querySelector('.popup__btn');

const currentValueName = document.querySelector('.profile__name');
const currentValueJob = document.querySelector('.profile__description');

/** 
 * Ошибка, возникающая в случае пустой строки
 * param {String} message, сообщение об ошибке
*/

function isEmpty(message) {
  this.message = message;
  this.name = 'isEmpty';
}

btnEdit.addEventListener('click', function(evt) {
  evt.preventDefault();
  popup.classList.add('popup_opened');
});

btnClose.addEventListener('click', function(evt) {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
});

/** 
 * Добавлеяет текст в input
 * param {object} name, объект содержащий имя пользователя
 * param {object} job, объект содержаший информацию о работе
*/

function renderData (name, job) {
  nameInput.value  = name.innerHTML;
  jobInput.value = job.innerHTML;
}

renderData(currentValueName, currentValueJob);

function formSubmitHandler (evt) {
  try {
    evt.preventDefault();

    if (nameInput.value.length === 0) {
      throw new isEmpty('Имя не может быть пустым');
    }

    if (jobInput.value.length === 0) {
      throw new isEmpty('Поле работа не может быть пустым');
    }

    currentValueName.textContent = nameInput.value;
    currentValueJob.textContent = jobInput.value;

    popup.classList.remove('popup_opened');
    body.classList.remove('body_lock');
  } catch (e) {
    alert(e.message);
  }
}

formElement.addEventListener('submit', formSubmitHandler); 