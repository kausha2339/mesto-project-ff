
export const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
}

const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    console.log(`errorElement - ${errorElement}`)
    console.log(`inputElement.id - ${inputElement.id}`)
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = "";
}

const isValid = (formElement, inputElement, validationConfig) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } 
    else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(
            formElement,
            inputElement,
            inputElement.validationMessage,
            validationConfig
        );
    }
    else {
        hideInputError(formElement, inputElement, validationConfig);
    }
}

const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  
    const buttonElement = formElement.querySelector(
        validationConfig.submitButtonSelector
      );
      toggleButtonState(inputList, buttonElement);
    
      inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          isValid(formElement, inputElement, validationConfig);
          toggleButtonState(inputList, buttonElement);
        });
      });
    };
    

  export const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  
    formList.forEach((formElement) => {
        formElement.addEventListener("submit", function (evt) {
          evt.preventDefault();
        });
        setEventListeners(formElement, validationConfig);
      });
  };
  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
  };
  
  export function clearValidation(formElement, validationConfig) {
      const inputList = Array.from(
        formElement.querySelectorAll(validationConfig.inputSelector)
      );
      const buttonElement = formElement.querySelector(
        validationConfig.submitButtonSelector
      );
    
      inputList.forEach((inputElement) =>
        hideInputError(formElement, inputElement, validationConfig)
      );
      toggleButtonState(inputList, buttonElement, validationConfig);
    }