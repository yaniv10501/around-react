import { useState, useContext, useEffect, useRef, useCallback } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser
}) {

  const formRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const [formValid, setFormValid] = useState(false);

  const [nameError, setNameError] = useState({
    isValid: true,
    inputError: ''
  });

  const [aboutError, setAboutError] = useState({
    isValid: true,
    inputError: ''
  });

  const [name, setName] = useState('');

  const [about, setAbout] = useState('');

  const handleNameInput = (event) => {

    const input = event.target.value;

    setName(input);

    if (input.length < 2) {

      setNameError({
        isValid: false,
        inputError: 'Use at least 2 characters'
      });

    }

    if (input.length > 40) {

      setNameError({
        isValid: false,
        inputError: 'Use no more than 40 characters'
      });

    }

    if (input.length >= 2 && input.length <= 40) {

      setNameError({
        isValid: true,
        inputError: ''
      });

    }

  }

  const handleAboutInput = (event) => {

    const input = event.target.value;

    setAbout(input);

    if (input.length <= 2) {

      setAboutError({
        isValid: false,
        inputError: 'Use at least 2 characters'
      });

    }

    if (input.length > 200) {

      setAboutError({
        isValid: false,
        inputError: 'Use no more than 200 characters'
      });

    }

    if (input.length > 2 && input.length <= 200) {

      setAboutError({
        isValid: true,
        inputError: ''
      });

    }


  }

  const handleSubmit = async (event) => {

    event.preventDefault();

    setIsLoading(true);

    await onUpdateUser(name, about);

    setTimeout(() => setIsLoading(false), 500);

  }

  const currentUser = useContext(CurrentUserContext);

  const handleClosePopup = useCallback (() => {

    onClose();

    setName(currentUser.name);
    setAbout(currentUser.about);

    setAboutError({
      isValid: true,
      inputError: ''
    });

    setNameError({
      isValid: true,
      inputError: ''
    });

  }, [currentUser, onClose])

  useEffect(() => {

    setName(currentUser.name);
    setAbout(currentUser.about);

  }, [currentUser]);

  useEffect(() => {

    if (nameError.isValid && aboutError.isValid) {

      setFormValid(true);

    }

    else {

      setFormValid(false);

    }

  }, [nameError, aboutError]);

  const handleClick = (event) => {
    if (event.target.className.includes('popup_opened')) handleClosePopup();
  }

  useEffect(() => {

    const handleKeyDown = (event) => {

      if (event.key.toLowerCase() === 'escape') {

        handleClosePopup();

      }

    }

    if (isOpen) document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);

  }, [isOpen, handleClosePopup])

  return (
    <PopupWithForm
      onClick={handleClick}
      name="edit-info"
      formName="editInfo"
      formTitle="Edit profile"
      submitTitle="Save"
      submitLoadingTitle="Saving"
      isOpen={isOpen}
      onClose={handleClosePopup}
      onSubmit={handleSubmit}
      formRef={formRef}
      formValid={formValid}
      isLoading={isLoading}
    >
      <input
        className="popup__input popup__input_type_name"
        id="name-input"
        type="text"
        placeholder="name"
        name="name"
        value={name || ""}
        onChange={handleNameInput}
        required
      />

      <span className="popup__error name-input-error">{nameError.inputError}</span>

      <input
        className="popup__input popup__input_type_about"
        id="about-input"
        type="text"
        placeholder="about me"
        name="job"
        value={about || ""}
        onChange={handleAboutInput}
        required
      />

      <span className="popup__error about-input-error">{aboutError.inputError}</span>

    </PopupWithForm>
  )

}
