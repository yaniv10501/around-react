import { useState, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace
}) {

  const formRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const [formValid, setFormValid] = useState(false);

  const [nameError, setNameError] = useState({
    isValid: false,
    inputError: ''
  });

  const [urlError, setUrlError] = useState({
    isValid: false,
    inputError: ''
  });

  const [name, setName] = useState('');

  const [link, setLink] = useState('');

  const resetForm = () => {

    setName('');

    setLink('');

    setUrlError({
      isValid: false,
      inputError: ''
    });

    setNameError({
      isValid: false,
      inputError: ''
    });

  }

  const pattern = /(https:\/\/)[a-zA-Z0-9]+[.][a-z]{2,5}/;

  const handleNameInput = (event) => {

    const input = event.target.value;

    setName(input);

    if (input.length < 2) {

      setNameError({
        isValid: false,
        inputError: 'Use at least 2 characters'
      });

    }

    if (input.length > 30) {

      setNameError({
        isValid: false,
        inputError: 'Use no more than 30 characters'
      });

    }

    if (input.length >= 2 && input.length <= 30) {

      setNameError({
        isValid: true,
        inputError: ''
      });

    }

  };

  const handleLinkInput = (event) => {

    const input = event.target.value;

    setLink(input);

    const result = pattern.test(input);

    if (result) {

      setUrlError({
        isValid: true,
        inputError: ''
      });

    }

    else {

      setUrlError({
        isValid: false,
        inputError: 'Please fill in a valid URL'
      });

    }

  };

  const handleClosePopup = () => {

    onClose();

    resetForm();

  }

  const handleSubmit = async (event) => {

    event.preventDefault();

    setIsLoading(true);

    await onAddPlace(name, link);

    resetForm();

    setTimeout(() => setIsLoading(false), 500);

  };

  const handleClick = (event) => {

    if (event.target.className.includes('popup_opened')) {

      onClose();

      resetForm();

    };

  }

  useEffect(() => {

    if (nameError.isValid && urlError.isValid) {

      setFormValid(true);

    }

    else {

      setFormValid(false);

    }

  }, [nameError, urlError]);

  useEffect(() => {

    const handleKeyDown = (event) => {

      if (event.key.toLowerCase() === 'escape') {

        onClose();

        resetForm();

      }

    }

    if (isOpen) document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);

  }, [isOpen, onClose])

  return (
    <PopupWithForm
      name="add"
      formName="add"
      formTitle="New Place"
      submitTitle="Create"
      submitLoadingTitle="Creating"
      isOpen={isOpen}
      onClose={handleClosePopup}
      onSubmit={handleSubmit}
      formRef={formRef}
      formValid={formValid}
      isLoading={isLoading}
      onClick={handleClick}
    >

      <input
        value={name}
        onChange={handleNameInput}
        className="popup__input popup__input_type_title"
        id="title-input"
        type="text"
        placeholder="Title"
        name="title"
        required
      />

      <span className="popup__error  title-input-error">{nameError.inputError}</span>

      <input
        value={link}
        onChange={handleLinkInput}
        className="popup__input popup__input_type_url"
        id="url-input"
        type="url"
        placeholder="Image URL"
        name="url"
        required
      />

      <span className="popup__error url-input-error">{urlError.inputError}</span>

    </PopupWithForm>
  )

}
