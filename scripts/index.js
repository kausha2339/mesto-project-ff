
// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(card, deleteCard) {
    const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
    const cardDeleteButton = cardItem.querySelector(".card__delete-button");
    const cardImg = cardItem.querySelector(".card__image");
    cardImg.src=card.link;
    cardImg.alt=card.name;
    cardItem.querySelector(".card__image").src = card.link;
    cardItem.querySelector(".card__title").textContent = card.name;
    cardDeleteButton.addEventListener("click", () => {
        deleteCard(cardItem);
    });
    return cardItem;
}

// @todo: Функция удаления карточки
function deleteCard(cardItem) {
    cardItem.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
    const cardElement = createCard(card, deleteCard);
    cardsContainer.appendChild(cardElement);
});

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_new-card');
const closeButtons = document.querySelectorAll('.popup__close');
const overlay = document.querySelectorAll('.popup');

function openPopup(element) {
    element.classList.add('popup_opened');
};

function closePopup(element) {
    element.classList.remove('popup_opened');
};

editButton.addEventListener('click', () => openPopup(editPopup));

closeButtons.forEach(button => {
    button.addEventListener('click', () => closePopup(editPopup));
});