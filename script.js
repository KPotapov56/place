(function () {
  //Переменные
  const cardList = document.querySelector('.places-list');
  const buttonAdd = document.querySelector('.user-info__button');
  const buttonEdit = document.querySelector('.user-info__edit-button');
  const closeAddButton = document.querySelector('.popup__close_add');
  const closeEditButton = document.querySelector('.popup__close_edit');
  const closeImgButton = document.querySelector('.popup__close_image');
  const userName = document.querySelector('.user-info__name');
  const userJob = document.querySelector('.user-info__job');
  const buttonSave = document.querySelector('.popup__button_save');
  const formUserInfo = document.forms.user;
  const name = formUserInfo.elements.username;
  const job = formUserInfo.elements.about;
  const formNewCard = document.forms.new;

  const newCard = new CardList(cardList, initialCards, createCard);
  newCard.render();

  const newPlacePopUp = new Popup(document.getElementById('new-place'));
  const profileEditPopUp = new Popup(document.getElementById('profile-edit'));
  const imagePopUp = new Popup(document.getElementById('image'));
  const userInfo = new UserInfo(userName, userJob, name, job);

  const newCardValid = new FormValidator(formNewCard);
  const userInfoValid = new FormValidator(formUserInfo);

  //функции
  function createCard(item) {
    return new Card(item, setImgUrl).create();
  };

  function setImgUrl(link) {
    imagePopUp.toggle(link);
  };

  function resetUserCard(){
    name.setCustomValidity("");
    job.setCustomValidity("");
    buttonSave.removeAttribute('disabled');
    buttonSave.classList.add('popup__button_valid');
  }

  //Слушатели событий
  formNewCard.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputName = formNewCard.querySelector('.popup__input_type_name');
    const inputLink = formNewCard.querySelector('.popup__input_type_link-url');

    newCard.addCard({
      name: inputName.value,
      link: inputLink.value
    });

    formNewCard.reset();
    newPlacePopUp.toggle();
    newCardValid.setSubmitButtonState(false)
  });


  formNewCard.addEventListener('input', (evt) => {
    newCardValid.handlerInputForm(evt);
  });


  formUserInfo.addEventListener('submit', (event) => {
    event.preventDefault();
    userInfo.updateUserInfo(name.value, job.value);
    profileEditPopUp.toggle();
  });

  formUserInfo.addEventListener('input', (evt) => {
    userInfoValid.handlerInputForm(evt);
  });

  buttonAdd.addEventListener('click', () => {
    newCardValid.cleanError();
    newPlacePopUp.toggle();
    newCardValid.setSubmitButtonState()
  });

  buttonEdit.addEventListener('click', () => {

    userInfoValid.cleanError();
    profileEditPopUp.toggle();
    userInfo.setUserInfo(userName.textContent, userJob.textContent)
  });

  closeAddButton.addEventListener('click', () => {
    newPlacePopUp.toggle();
    formNewCard.reset();
    newCardValid.cleanError();
    newCardValid.setSubmitButtonState()
  });

  closeEditButton.addEventListener('click', () => {
    profileEditPopUp.toggle();
    userInfoValid.cleanError();
    resetUserCard();
  });

  closeImgButton.addEventListener('click', () => {
    imagePopUp.toggle()
  });
})();

/*
 Что понравилось:
 - Код структурирован
 - Использованы все необходимые классы
 Можно лучше:
 - Реализовать закрытие попапов на esc
*/
