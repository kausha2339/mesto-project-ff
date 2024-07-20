import './pages/index.css'; // добавьте импорт главного файла стилей npm i css-loader --save-dev
import { initialCards } from './components/cards.js';
import {createCard, deleteCard, likeCard, cardsContainer } from './components/function.js';
import {openPopUp, closePopUp, handleEscape} from './components/modal.js';

const popUpEdit = document.querySelector(".popup_type_edit");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const popUpAdd = document.querySelector(".popup_type_new-card");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popUpAddForm = document.querySelector(".popup_type_new-card .popup__form");
const inputNameCard = document.querySelector(".popup__input_type_card-name");
const inputLinkCard = document.querySelector(".popup__input_type_url");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const popUpTypeImage = document.querySelector(".popup_type_image");
const popUpImage = document.querySelector(".popup__image");
const popUpImageCaption = document.querySelector(".popup__caption");

const profileForm = document.querySelector(".popup__form");

initialCards.forEach((card) => {
  const cardItem = createCard(card, deleteCard, likeCard, handleImagePopup);
  cardsContainer.appendChild(cardItem);
});

const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close");
    closeButton.addEventListener('click', (event) => {
        closePopUp(popup);
    })
    popup.addEventListener('click', (event) => {
      if (event.target === event.currentTarget) {
      closePopUp(popup);
  }})
})

buttonAdd.addEventListener('click', () => { openPopUp(popUpAdd) });
buttonEdit.addEventListener('click', () => { 
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopUp(popUpEdit);
})


function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopUp(popUpEdit);
}

function handleCardFormSubmit(evt) { 
  evt.preventDefault(); 
  const newCard = { 
    link: inputLinkCard.value, 
    name: inputNameCard.value
  } 
  const cardElement = createCard(newCard, deleteCard, likeCard, handleImagePopup);
  cardsContainer.prepend(cardElement); 
  popUpAddForm.reset();
  closePopUp(popUpAdd); 
}

export function handleImagePopup(card) {
  popUpImage.src = card.link;
  popUpImageCaption.textContent = card.name;
  popUpImage.alt = card.name;
  openPopUp(popUpTypeImage);
}

popUpAddForm.addEventListener('submit', handleCardFormSubmit);
profileForm.addEventListener('submit', handleProfileFormSubmit); 