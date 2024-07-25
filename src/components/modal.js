export const openPopUp = (modal) => { 
    modal.classList.add("popup_is-opened");  
    modal.classList.add("popup_is-animated");  // сначала анимация
  setTimeout(() => {
    modal.classList.add("popup_is-opened");  // потом только открытие
  }, 1);
    document.addEventListener('keydown', handleEscape);
}
  
export function closePopUp (modal) {
    modal.classList.remove("popup_is-opened");  
    modal.classList.add("popup_is-animated");  // сначала анимация
    setTimeout(() => {
    modal.classList.remove("popup_is-opened");
  }, 1);
    document.removeEventListener('keydown', handleEscape);
}

export function handleEscape (evt) {
    if (evt.key === 'Escape') {
        const openedPopUp = document.querySelector(".popup_is-opened");
        closePopUp(openedPopUp);
    }
}