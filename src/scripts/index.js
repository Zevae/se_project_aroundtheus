import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import "../pages/index.css";
// Left at "PopupWithImage.js" being implemented into "index.js".
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditModal = document.querySelector("#edit-modal");
const addCardModal = document.querySelector("#add-modal");
const imageModal = document.querySelector("#image-modal");
const profileFormElement = document.forms["edit-profile-form"];
const addCardFormElement = document.forms["add-card-form"];
const nameInput = profileFormElement.querySelector(".modal__input_type_name");
const jobInput = profileFormElement.querySelector(
  ".modal__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const closeButtons = document.querySelectorAll(".modal__close");
const modalImage = document.querySelector("#modal-image");
const modalImageDescription = document.querySelector(
  "#modal-image-description"
);
const titleInput = addCardFormElement.querySelector(".modal__input_type_title");
const urlInput = addCardFormElement.querySelector(".modal__input_type_url");

const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save--button",
  inactiveButtonClass: "modal__save_button--disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const profileFormValidator = new FormValidator(config, profileFormElement);
const addCardFormValidator = new FormValidator(config, addCardFormElement);
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscKey);
  modal.removeEventListener("mousedown", handleOverlayClick);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscKey);
  modal.addEventListener("mousedown", handleOverlayClick);
}

function handleEscKey(event) {
  if (event.key === "Escape" || event.key === "Esc") {
    const openModal = document.querySelector(".modal_opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function handleOverlayClick(event) {
  if (event.target.classList.contains("modal_opened")) {
    closeModal(event.target);
  }
}

function openImageModal(src, description) {
  modalImage.src = src;
  modalImage.alt = description;
  modalImageDescription.textContent = description;
  openModal(imageModal);
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, "#card-template", openImageModal);
      const cardElement = card.getView();
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

cardSection.renderItems();

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const title = titleInput.value;
  const link = urlInput.value;
  const newCard = new Card(
    { name: title, link: link },
    "#card-template",
    openImageModal
  );
  const cardElement = newCard.getView();

  cardSection.addItem(cardElement);
  evt.target.reset();
  closeModal(addCardModal);
  addCardFormValidator.disableButton();
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profileEditModal);
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);
profileFormElement.addEventListener("submit", handleProfileEditSubmit);

const addNewCardButton = document.querySelector(".profile__add-button");
addNewCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

const profileEditBtn = document.querySelector("#profile-edit-btn");
profileEditBtn.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  profileFormValidator.resetValidation();

  openModal(profileEditModal);
});
