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
import Api from "../components/Api.js";

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
  cardSectionSelector,
);

cardSection.renderItems();

profileEditBtn.addEventListener("click", () => {
  const { title, description } = userInfo.getUserInfo();
  nameInput.value = title;
  jobInput.value = description;
  profileFormValidator.resetValidation();
  profileFormPopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();
  addCardFormPopup.open();
});

fetch("https://around-api.en.tripleten-services.com/v1/cards", {
  headers: {
    authorization: "2c8db2a6-0c21-4c28-99ab-77668cc9b409",
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({ name: userData.name, about: userData.about });
    userInfo.setUserAvatar(userData.avatar);
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.error(err);
  });

//Left off at the figma design: https://www.figma.com/design/E5x6ib3osaUUNwLRRAsTDX/Sprint-9-%E2%80%94-Applied-JavaScript?node-id=1530-2&p=f
//Trying to get the trash icon to pop open a modal, asking if the user is sure that they want to delete the card/photo
