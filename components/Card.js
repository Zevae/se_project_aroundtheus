export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeIcon());

    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => this._handleDeleteCard());

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleImageClick(this._link, this._name)
      );
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = this._getTemplate();

    this._cardElement.querySelector(".card__title").textContent = this._name;
    const cardImage = this._cardElement.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
