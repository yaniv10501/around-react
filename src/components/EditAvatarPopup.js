import { useState, useEffect, useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar
}) {

  const [isLoading, setIsLoading] = useState(false);

  const [formValid, setFormValid] = useState(false);

  const [urlError, setUrlError] = useState('');

  const resetForm = () => {

    inputRef.current.value = '';

    setUrlError('');

    setFormValid(false);

  }

  const pattern = /(https:\/\/)[a-zA-Z0-9]+[.][a-z]{2,5}/;

  const handleUrlInputChange = (event) => {

    const result = pattern.test(event.target.value);

    if (result) {

      setUrlError('');

      setFormValid(true);

    }

    else {

      setUrlError('Please fill in a valid URL');

      setFormValid(false);

    }

  }

  const formRef = useRef();

  const inputRef = useRef();

  const handleClosePopup = () => {

    onClose();

    resetForm();

  }

  const handleClick = (event) => {

    if (event.target.className.includes('popup_opened')) {

      onClose();

      resetForm();

    };

  }

  const handleSubmit = async (event) => {

    event.preventDefault();

    setIsLoading(true);

    await onUpdateAvatar(inputRef.current.value);

    resetForm();

    setTimeout(() => setIsLoading(false), 500);

  }

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
      name="edit-picture"
      formName="editPicture"
      formTitle="Change profile picture"
      submitTitle="Save"
      submitLoadingTitle="Saving"
      isOpen={isOpen}
      onClose={handleClosePopup}
      onSubmit={handleSubmit}
      formRef={formRef}
      formValid={formValid}
      isLoading={isLoading}
      onClick={handleClick}
    >

      <input
        ref={inputRef}
        onChange={handleUrlInputChange}
        className="popup__input popup__input_type_profile-picture"
        id="profile-picture-input"
        placeholder="profile picture url"
        name="picture"
        type="url"
        required
      />

      <span className="popup__error profile-picture-input-error">{urlError}</span>

    </PopupWithForm>
  )

}
