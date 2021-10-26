export default function PopupWithForm({
  name,
  formName,
  formTitle,
  submitTitle,
  isOpen,
  onClose,
  children
}) {

  return (
    <div
      className={
        isOpen
          ? `popup popup_type_${name} popup_opened`
          : `popup popup_type_${name}`
      }>

      <div className="popup__container">

        <form className="popup__form" name={formName} noValidate _id="">

          <h2 className="popup__title">{formTitle}</h2>

          {children}

          <button className="popup__save-button" type="submit">{submitTitle}</button>

        </form>

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
