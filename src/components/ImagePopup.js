export default function ImagePopup({
  selectedCard: { name, link },
  isOpen,
  onClose
}) {

  return (
    <div
      className={
        isOpen
          ? "popup popup_type_image popup_opened"
          : "popup popup_type_image"
      }>

      <div className="popup__container popup__container_type_image">

        <img className="popup__image" src={link} alt={name} />

        <h2 className="popup__image-title">{name}</h2>

        <button
          className="popup__close-button"
          type="button"
          aria-label="Close"
          onClick={onClose}
        />

      </div>

    </div>
  )

}
