export default class CardList {
  constructor(container, createCard) {
    this.container = container;
    this.createCard = createCard;
  }

  addCard(data) {
    const card = this.createCard(data);
    this.container.append(card);
  }

  render(array) {
    array.forEach(item => {
      this.addCard(item)
    });
  }
}