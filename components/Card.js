export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    // ".card__like-button"
    const likeButton = this._cardElement.querySelector(".card__like-button");
    // ".card__trash-button"
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .cloneNode(true);
    // get the card view
    // set event listeners
    this._setEventListeners();
    // return the card
  }
}
