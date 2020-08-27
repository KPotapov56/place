export default class UserInfo {
  constructor(nameContainer, aboutContainer, avatarContainer) {
    this.nameContainer = nameContainer;
    this.aboutContainer = aboutContainer;
    this.avatarContainer = avatarContainer;
  }

  setUserInfo(name, about, avatar) {  //обновляет данные внутри класса
    this.name = name;
    this.about = about;
    this.avatar = avatar;
  }

  updateUserInfo() {  //отображает данные на странице
    this.nameContainer.textContent = this.name;
    this.aboutContainer.textContent = this.about;
    this.avatarContainer.style.backgroundImage = this.avatar;
  }
}