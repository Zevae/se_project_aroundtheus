export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
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
      const openModal = document.querySelector(".modal_opened");
      if (openModal) {
        this.close(openModal);
      }
    }
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".modal__close")
      .addEventListener("click", () => this.close());
  }
}
