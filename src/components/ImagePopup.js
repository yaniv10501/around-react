export default function ImagePopup(props) {

  const { name, link } = props.selectedCard;

  return (
    <div
      className={
        props.isOpen
          ? "popup popup_type_image popup_opened"
          : "popup popup_type_image"
      }>

      <div className="popup__container popup__container_type_image">

        <img className="popup__image" src={link} alt={name} />

        <h2 className="popup__image-title">{name}</h2>

        <button
          className="popup__close-button"
          type="button"
          ariaLabel="Close"
          onClick={props.onClose}
        ></button>

      </div>

    </div>
  )

}
