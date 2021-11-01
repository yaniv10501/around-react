import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeleteCardPopup({
  isOpen,
  onClose,
  onDeleteCard
}) {

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (event) => {
    if (event.target.className.includes('popup_opened')) onClose();
  }

  const handleSubmit = async (event) => {

    setIsLoading(true);

    await onDeleteCard(event);

    setTimeout(() => setIsLoading(false), 500);

  }

  useEffect(() => {

    const handleKeyDown = (event) => {

      if (event.key.toLowerCase() === 'escape') {

        onClose();

      }

    }

    if (isOpen) document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);

  }, [isOpen, onClose])

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="delete"
      formName="delete"
      formTitle="Are you sure?"
      submitTitle="Yes"
      submitLoadingTitle="Deleting"
      formValid={true}
      isLoading={isLoading}
      onClick={handleClick}
    />
  )

}
