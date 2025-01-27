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
const closeButtons = document.querySelectorAll(".modal__close");

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
  const modalImage = document.querySelector("#modal-image");
  const modalImageDescription = document.querySelector("#modal-image-description");

  modalImage.src = src;
  modalImage.alt = description;
  modalImageDescription.textContent = description;
  openModal(imageModal);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", openImageModal);
  return card.getView();
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardWrap.prepend(cardElement);
});

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const titleInput = addCardFormElement.querySelector(".modal__input_type_title");
  const urlInput = addCardFormElement.querySelector(".modal__input_type_url");

  const title = titleInput.value;
  const link = urlInput.value;
  const newCard = createCard({ name: title, link: link });

  cardWrap.prepend(newCard);
evt.target.reset(); 
addCardFormValidator.disableButton(); 
closeModal(addCardModal);
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
  addCardFormValidator.disableButton();
  openModal(addCardModal);
});

const profileEditBtn = document.querySelector("#profile-edit-btn");
profileEditBtn.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  profileFormValidator.resetValidation();
  openModal(profileEditModal);
});
