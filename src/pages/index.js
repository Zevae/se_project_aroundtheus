import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  config,
  profileFormElement,
  addCardFormElement,
  nameInput,
  jobInput,
  profileEditBtn,
  addNewCardButton,
  profilePopupSelector,
  cardPopupSelector,
  imagePopupSelector,
  cardSectionSelector,
  userNameSelector,
  userJobSelector,
} from "../utils/constants.js";
import "../pages/index.css";

function createCard(cardData) {
  const cardElement = new Card(cardData, "#card-template", (src, text) => {
    popupWithImage.open({ name: text, link: src });
  });
  return cardElement.getView();
}

const profileFormValidator = new FormValidator(config, profileFormElement);
const addCardFormValidator = new FormValidator(config, addCardFormElement);
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector: userNameSelector,
  jobSelector: userJobSelector,
});

const popupWithImage = new PopupWithImage({
  popupSelector: imagePopupSelector,
});
popupWithImage.setEventListeners();

const profileFormPopup = new PopupWithForm({
  popupSelector: profilePopupSelector,
  handleFormSubmit: ({ title, description }) => {
    userInfo.setUserInfo(title, description);
    profileFormPopup.close();
  },
});
profileFormPopup.setEventListeners();

const addCardFormPopup = new PopupWithForm({
  popupSelector: cardPopupSelector,
  handleFormSubmit: (formData) => {
    const newCard = createCard({ name: formData.title, link: formData.url });
    cardSection.addItem(newCard);
    addCardFormValidator.disableButton();
    addCardFormPopup.close();
  },
});
addCardFormPopup.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const newCard = createCard(cardData);
      cardSection.addItem(newCard);
    },
  },
  cardSectionSelector
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

//New branch
