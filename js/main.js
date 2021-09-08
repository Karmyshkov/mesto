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


btnEdit.addEventListener('click', function(evt) {
  evt.preventDefault();
  popup.classList.add('popup_opened');
  body.classList.add('body_lock');
});

btnClose.addEventListener('click', function(evt) {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
  body.classList.remove('body_lock');
});

/** 
 * Добавлеяет текст в input
 * param {object} name, объект содержащий имя пользователя
 * param {object} job, объект содержаший информацию об работе
*/

function renderData (name, job) {
  nameInput.value  = name.innerHTML;
  jobInput.value = job.innerHTML;
}

renderData(currentValueName, currentValueJob);

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    
    currentValueName.textContent = nameInput.value;
    currentValueJob.textContent = jobInput.value;

    popup.classList.remove('popup_opened');
    body.classList.remove('body_lock');
}

formElement.addEventListener('submit', formSubmitHandler); 