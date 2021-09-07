let body = document.querySelector('.body');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('input[name="userName"]');
let jobInput = document.querySelector('input[name="userJob"]');

let btnEdit = document.querySelector('.profile__edit');
let btnClose = formElement.querySelector('.popup__close');
let btnSave = formElement.querySelector('.popup__btn');

let currentValueName = document.querySelector('.profile__name');
let currentValueJob = document.querySelector('.profile__description');

btnEdit.addEventListener('click', function(evt) {
  evt.preventDefault();
  popup.classList.add('popup_opened');
  body.classList.add('body_lock');
});

btnClose.addEventListener('click', function(evt) {
  evt.preventDefault();
  popup.classList.remove('popup_opened');
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
}

formElement.addEventListener('submit', formSubmitHandler); 