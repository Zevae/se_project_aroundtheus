export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscKey = this._handleEscKey.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscKey);
    this._popupElement.addEventListener("mousedown", this._handleOverlayClick);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscKey);
    this._popupElement.removeEventListener(
      "mousedown",
      this._handleOverlayClick
    );
  }

  _handleEscKey(event) {
    if (event.key === "Escape" || event.key === "Esc") {
      this.close();
    }
  }

  _handleOverlayClick(event) {
    if (event.target === this._popupElement) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".modal__close")
      .addEventListener("click", () => this.close());
  }
}
