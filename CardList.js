class CardList {
  constructor(container, array, createCard) {
    this.container = container;
    this.array = array;
    this.createCard = createCard;
  }

  addCard(data) {
    const card = this.createCard(data);
    this.container.append(card);
  }

  render() {
    this.array.forEach(item => {
      this.addCard(item)
    });
  }
}