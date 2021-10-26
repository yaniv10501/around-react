export default function PopupWithForm(props) {

  return (
    <div
      className={
        props.isOpen
          ? `popup popup_type_${props.name} popup_opened`
          : `popup popup_type_${props.name}`
      }>

      <div className="popup__container">

        <form className="popup__form" name={props.formName} noValidate _id="">

          <h2 className="popup__title">{props.formTitle}</h2>

          {props.children}

          <button className="popup__save-button" type="submit">{props.submitTitle}</button>

        </form>

        <button
          className="popup__close-button"
          type="button"
          aria-label="Close"
          onClick={props.onClose}
        ></button>

      </div>

    </div>
  )

}
