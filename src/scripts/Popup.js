class Popup {
  constructor(container) {
    this.container = container;
  }

  toggle(link = null) {
    if (link) {
      this.container.querySelector('.popup__image').src = link
    }

    this.container.classList.toggle('popup_is-opened');
  }
}
