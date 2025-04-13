import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import "../pages/index.css";

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

const profileFormElement = document.forms["edit-profile-form"];
const addCardFormElement = document.forms["add-card-form"];
const nameInput = profileFormElement.querySelector(".modal__input_type_name");
const jobInput = profileFormElement.querySelector(
  ".modal__input_type_description"
);
const profileEditBtn = document.querySelector("#profile-edit-btn");
const addNewCardButton = document.querySelector(".profile__add-button");

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

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const popupWithImage = new PopupWithImage({ popupSelector: "#image-modal" });
popupWithImage.setEventListeners();

const profileFormPopup = new PopupWithForm({
  popupSelector: "#edit-modal",
  handleFormSubmit: ({ title, description }) => {
    userInfo.setUserInfo(title, description);
    profileFormPopup.close();
  },
});
profileFormPopup.setEventListeners();

const addCardFormPopup = new PopupWithForm({
  popupSelector: "#add-modal",
  handleFormSubmit: (formData) => {
    const newCard = new Card(
      { name: formData.title, link: formData.url },
      "#card-template",
      (src, text) => popupWithImage.open({ name: text, link: src })
    );
    cardSection.addItem(newCard.getView());
    addCardFormValidator.disableButton();
    addCardFormPopup.close();
  },
});
addCardFormPopup.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, "#card-template", (src, text) => {
        popupWithImage.open({ name: text, link: src });
      });
      cardSection.addItem(card.getView());
    },
  },
  ".cards__list"
);

cardSection.renderItems();

profileEditBtn.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = job;
  profileFormValidator.resetValidation();
  profileFormPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardFormPopup.open();
});
