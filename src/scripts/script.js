import Api from './Api.js';
import Card from './Card.js';
import CardList from './CardList.js';
import FormValidator from './FormValidator.js';
import Popup from './Popup.js';
import UserInfo from './UserInfo.js';
import '../pages/index.css';


const API_URL = process.env.NODE_ENV === "production" ? "https://nomoreparties.co" : "http://nomoreparties.co";
const config = {
  url: `${API_URL}/cohort12`,
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