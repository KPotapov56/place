class Card {
  constructor(item, imageOpenCallback) {
    this.item = item;
    this.imageOpenCallback = imageOpenCallback;
    this.setImgUrl = this.setImgUrl.bind(this);
  }

  create() {
    const templateCard = `<div class="place-card">
        <div class="place-card__image" style="#">
          <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name"></h3>
          <div class="place-card__like">
            <button class="place-card__like-icon"></button>
            <p class="place-card__qty-of-likes"></p>
          <div>
        </div>
        </div>`;
    const placeCard = document.createElement("div");
    placeCard.insertAdjacentHTML('beforeend', templateCard.trim());
    placeCard.querySelector('.place-card__name').textContent = this.item.name;
    placeCard.querySelector('.place-card__image').style.backgroundImage = `url(${this.item.link})`;
    this.likeIcon = placeCard.querySelector('.place-card__like-icon');
    this.deleteIcon = placeCard.querySelector('.place-card__delete-icon');
    this.image = placeCard.querySelector('.place-card__image');
    this.setEventListeners();
    return placeCard.firstChild;
  }

  remove() {
    this.currentCard = event.target.closest('.place-card');
    this.currentCard.removeEventListener('click', this.setImgUrl);
    this.currentCard.remove();
  }

  like() {
    this.classList.toggle('place-card__like-icon_liked');
  }

  setImgUrl() {
     if (event.target.classList.contains('place-card__image')) {
      this.imageOpenCallback(this.item.link);
      }   
  }

  setEventListeners() {
    this.likeIcon.addEventListener('click', this.like);
    this.deleteIcon.addEventListener('click', this.remove);
    this.image.addEventListener('click', this.setImgUrl);
  }
}
