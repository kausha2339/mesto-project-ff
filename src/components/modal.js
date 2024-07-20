export const openPopUp = (modal) => { 
    modal.classList.add("popup_is-opened");
    document.addEventListener('keydown', handleEscape);
}
  
export function closePopUp (modal) {
    modal.classList.remove("popup_is-opened");
    document.removeEventListener('keydown', handleEscape);
}

export function handleEscape (evt) {
    if (evt.key === 'Escape') {
        const openedPopUp = document.querySelector(".popup_is-opened");
        closePopUp(openedPopUp);
    }
}