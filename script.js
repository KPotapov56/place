(function () {
  //Переменные
  const config = {
    url: 'https://nomoreparties.co/cohort12',
    headers: {
      authorization: '044b3123-f80b-4642-b8a9-023004780c6a',
      'Content-Type': 'application/json'
    }
  };

  const errorMessages = {
    empty: 'Это обязательное поле',
    wrongLength: 'Должно быть от 2 до 30 символов',
    wrongUrl: 'Здесь должна быть ссылка'
  };

  const api = new Api(config);
  const cardList = document.querySelector('.places-list');
  const buttonAdd = document.querySelector('.user-info__button');
  const buttonEdit = document.querySelector('.user-info__edit-button');
  const closeAddButton = document.querySelector('.popup__close_add');
  const closeEditButton = document.querySelector('.popup__close_edit');
  const closeImgButton = document.querySelector('.popup__close_image');
  const userName = document.querySelector('.user-info__name');
  const userAbout = document.querySelector('.user-info__about');
  const userAvatar = document.querySelector('.user-info__photo');
  const buttonSave = document.querySelector('.popup__button_save');
  const formUserInfo = document.forms.user;
  const name = formUserInfo.elements.username;
  const about = formUserInfo.elements.about;
  const formNewCard = document.forms.new;
  const inputName = formNewCard.elements.name;
  const inputLink = formNewCard.elements.link;
  const newPlacePopUp = new Popup(document.getElementById('new-place'));
  const profileEditPopUp = new Popup(document.getElementById('profile-edit'));
  const imagePopUp = new Popup(document.getElementById('image'));
  const userInfo = new UserInfo(userName, userAbout, userAvatar);
  const newCardValid = new FormValidator(formNewCard, errorMessages);
  const userInfoValid = new FormValidator(formUserInfo, errorMessages);
  const newCard = new CardList(cardList, createCard);

  api.getUserInfo()
    .then(res => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      userInfo.updateUserInfo();
    })
    .catch(res => {
      console.log(res);
    });


  api.getInitialCards()
    .then(res => {
      newCard.render(res);
    })
    .catch(res => {
      console.log(res);
    });

  //функции
  function createCard(item) {
    return new Card(item, setImgUrl).create();
  };

  function setImgUrl(link) {
    imagePopUp.toggle(link);
  };

  function resetUserCard() {
    name.setCustomValidity("");
    about.setCustomValidity("");
    buttonSave.removeAttribute('disabled');
    buttonSave.classList.add('popup__button_valid');
  }

  //Слушатели событий
  formNewCard.addEventListener('submit', (event) => {
    event.preventDefault();

    api.addNewCard(inputName.value, inputLink.value);

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
    api.editProfile(name.value, about.value)
      .then(res => {
        userInfo.setUserInfo(res.name, res.about, res.avatar);
        userInfo.updateUserInfo();
        profileEditPopUp.toggle();
      })
      .catch(res => {
        console.log(res);
      });
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
    name.value = userName.textContent;
    about.value = userAbout.textContent;
    profileEditPopUp.toggle();
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
  Отлично, все замечания исправлены

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.
  Что бы реализовать оставшуюся часть задания необходимо разобраться с Promise.all
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  Т.к. для отрисовки карточек нужен id пользователя, поэтому отрисовать мы сможем их только
  после полученния с сервера данных пользователя
  Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
      this.api.getUserData(),
      this.api.getInitialCards()
    ])    
      .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
        const [userData, initialCards] = values;
        ......................  //все данные получены, отрисовываем страницу
      })
      .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
      })
      

  Если у Вас будет свободное время так же попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/