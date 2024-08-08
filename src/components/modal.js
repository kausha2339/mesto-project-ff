export const openPopUp = (modal) => {
  modal.classList.add("popup_is-animated"); // сначала анимация
  setTimeout(() => {
    modal.classList.add("popup_is-opened"); // потом только открытие
  }, 1);
  document.addEventListener("keydown", handleEscape);
};

export function closePopUp(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

export function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopUp = document.querySelector(".popup_is-opened");
    closePopUp(openedPopUp);
  }
}

export function renderLoading(button, isLoading) {
  if (isLoading) {
    button.textContent = "Сохранение...";
    button.disabled = true;
  } else {
    button.textContent = "Сохранить";
    button.disabled = false;
  }
}

export function closePopupOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopUp(evt.target);
  }
}

export function closePopupByCross(evt) {
  if (evt.target.classList.contains("popup__close")) {
    closePopUp(evt.target.closest(".popup"));
  }
}
