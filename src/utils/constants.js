export const initialCards = [
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
export const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save--button",
  inactiveButtonClass: "modal__save_button--disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
export const profileFormElement = document.forms["edit-profile-form"];
export const addCardFormElement = document.forms["add-card-form"];
export const nameInput = profileFormElement.querySelector(
  ".modal__input_type_name"
);
export const jobInput = profileFormElement.querySelector(
  ".modal__input_type_description"
);
export const profileEditBtn = document.querySelector("#profile-edit-btn");
export const addNewCardButton = document.querySelector(".profile__add-button");
export const profilePopupSelector = "#edit-modal";
export const cardPopupSelector = "#add-modal";
export const imagePopupSelector = "#image-modal";
export const cardSectionSelector = ".cards__list";
export const userNameSelector = ".profile__title";
export const userJobSelector = ".profile__description";
