import "./pages/index.css"; // добавьте импорт главного файла стилей npm i css-loader --save-dev
import { createCard, likeCard } from "./components/card.js";
import {
  openPopUp,
  closePopUp,
  closePopupOverlay,
  closePopupByCross,
  handleEscape,
} from "./components/modal.js";
import {
  enableValidation,
  validationConfig,
  clearValidation,
} from "./components/validation.js";
import {
  getUserInfo,
  getInitialCards,
  handleResponse,
  editProfileInfo,
  addNewCard,
  changeUserAvatar,
} from "./components/api.js";

const cardsContainer = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");

const popUpEdit = document.querySelector(".popup_type_edit");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const popUpAdd = document.querySelector(".popup_type_new-card");

const profileTitle = document.querySelector(".profile__title");
const profileInfo = document.querySelector(".profile__info");
const profileImage = document.querySelector(".profile__image");

const profileDescription = document.querySelector(".profile__description");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const formEditProfile = document.forms["edit-profile"];
const nameProfileInput = formEditProfile.elements.name;
const jobProfileInput = formEditProfile.elements.description;

const popUpTypeImage = document.querySelector(".popup_type_image");
const popUpImage = document.querySelector(".popup__image");
const popUpImageCaption = document.querySelector(".popup__caption");

const profileForm = document.querySelector(".popup__form");

const formNewCard = document.forms["new-place"];
const nameCardInput = formNewCard.elements["place-name"];
const linkCardInput = formNewCard.elements.link;

const formAvatar = document.forms["avatar"];
const linkInputAvatar = formAvatar.elements["avatar-link"];

Promise.all([getInitialCards(), getUserInfo()])
  .then(([dataCards, dataProfile]) => {
    handleProfileFormSubmit(dataProfile);
    handleInfoCards(dataCards, dataProfile._id);
  })
  .catch((err) => {
    console.log(`Что-то пошло не так. Ошибка: ${err}`);
  });

function renderLoading(button, isLoading) {
  if (isLoading) {
    button.textContent = "Сохранение...";
    button.disabled = true;
  } else {
    button.textContent = "Сохранить";
    button.disabled = false;
  }
}

function handleProfileFormSubmit(res) {
  profileInfo.dataset.userId = res._id;
  profileImage.style.backgroundImage = `url(${res.avatar})`;
  profileTitle.textContent = res.name;
  profileDescription.textContent = res.about;
}

function handleInfoCards(res, ownerId) {
  res.forEach((card) => {
    cardsContainer.append(
      createCard({ card: card, handleImagePopup, likeCard }, ownerId)
    );
  });
}

function handleFormSubmitProfile(evt) {
  evt.preventDefault();

  const saveButtonProfile = formEditProfile.querySelector(".button");
  renderLoading(saveButtonProfile, true);
  editProfileInfo(nameProfileInput.value, jobProfileInput.value)
    .then((res) => {
      handleProfileFormSubmit(res);
      closePopUp(popUpEdit);
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(saveButtonProfile, false);
    });
}

formEditProfile.addEventListener("submit", handleFormSubmitProfile);

function handleFormAddNewCardSubmit(evt) {
  evt.preventDefault();

  const saveButtonNewCard = formNewCard.querySelector(".button");
  renderLoading(saveButtonNewCard, true);
  addNewCard(nameCardInput.value, linkCardInput.value)
    .then((card) => {
      cardsContainer.prepend(
        createCard(
          { card: card, handleImagePopup, likeCard },
          profileInfo.dataset.userId
        )
      );
      formNewCard.reset();
      closePopUp(popUpAdd);
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(saveButtonNewCard, false);
    });
}
formNewCard.addEventListener("submit", handleFormAddNewCardSubmit);

function handleFormSubmitAvatar(evt) {
  evt.preventDefault();

  const saveButtonAvatar = formAvatar.querySelector(".button");
  renderLoading(saveButtonAvatar, true);
  changeUserAvatar(linkInputAvatar.value)
    .then((res) => {
      handleProfileFormSubmit(res);
      closePopUp(popupTypeAvatar);
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(saveButtonAvatar, false);
    });
}
formAvatar.addEventListener("submit", handleFormSubmitAvatar);

profileImage.addEventListener("click", () => {
  openPopUp(popupTypeAvatar);
  clearValidation(formAvatar, validationConfig);
});

buttonEdit.addEventListener("click", () => {
  openPopUp(popUpEdit);
  handleFormEditProfile();
  clearValidation(formEditProfile, validationConfig);
});

buttonAdd.addEventListener("click", () => {
  openPopUp(popUpAdd);
  clearValidation(formNewCard, validationConfig);
});

export function handleImagePopup(card) {
  popUpImage.src = card.src;
  popUpImage.alt = card.alt;
  popUpImageCaption.textContent = card.textContent;
  openPopUp(popUpTypeImage);
}

profileImage.addEventListener("click", () => {
  openPopUp(popupTypeAvatar);
  clearValidation(formAvatar, validationConfig);
});

popups.forEach((element) =>
  element.addEventListener("click", closePopupOverlay)
);
popups.forEach((element) =>
  element.addEventListener("click", closePopupByCross)
);

function handleFormEditProfile() {
  nameProfileInput.value = profileTitle.textContent;
  jobProfileInput.value = profileDescription.textContent;
}

enableValidation(validationConfig);
