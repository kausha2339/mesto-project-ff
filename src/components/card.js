

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
export const cardsContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки
export function createCard(card, deleteCard, likeCard, handleImagePopup) {
    const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
    const cardDeleteButton = cardItem.querySelector(".card__delete-button");
    const cardImg = cardItem.querySelector(".card__image");
    cardImg.alt = card.name;
    cardImg.src = card.link;
    cardItem.querySelector(".card__title").textContent = card.name;
    cardItem.querySelector(".card__like-button").addEventListener('click', likeCard);
    cardImg.addEventListener('click', () => handleImagePopup(card));


    cardDeleteButton.addEventListener('click', () => {
        deleteCard(cardItem);
    });
    return cardItem;
}
// @todo: Функция удаления карточки
export function deleteCard(cardItem) {
    cardItem.remove();
}


export function likeCard(cardItem) {
    cardItem.target.classList.toggle("card__like-button_is-active");
}