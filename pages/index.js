import Card from "../components/Card.js";
import FormValidator from '../components/FormValidator.js';

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

const cardWrap = document.querySelector(".cards__list");
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

const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const imageModalCloseButton = imageModal.querySelector(".modal__close--image");
const addNewCardButton = document.querySelector(".profile__add-button");
const modalImage = document.querySelector("#modal-image");
const modalImageDescription = document.querySelector(
  "#modal-image-description"
);

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

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", openImageModal);
  cardWrap.prepend(card.getView());
});

addNewCardButton.addEventListener("click", () => {
  const titleInput = addCardFormElement.querySelector(".modal__input_type_title");
  const urlInput = addCardFormElement.querySelector(".modal__input_type_url");
  titleInput.value = "";
  urlInput.value = "";
  addCardFormValidator.resetValidation();
  openModal(addCardModal);
});

function handleProfileEditSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  profileFormValidator.resetValidation();
  closeModal(profileEditModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const titleInput = addCardFormElement.querySelector(".modal__input_type_title");
  const urlInput = addCardFormElement.querySelector(".modal__input_type_url");
  const title = titleInput.value;
  const link = urlInput.value;
  const newCard = new Card({ name: title, link: link }, "#card-template", openImageModal);
  cardWrap.prepend(newCard.getView());
  titleInput.value = "";
  urlInput.value = "";
  addCardFormValidator.resetValidation();
  closeModal(addCardModal);
}

profileFormElement.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);
profileEditBtn.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  profileFormValidator.resetValidation();
  openModal(profileEditModal);
});
profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(addCardModal)
);
imageModalCloseButton.addEventListener("click", () => closeModal(imageModal));
