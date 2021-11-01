export default function PopupWithForm({
  name,
  formName,
  formTitle,
  submitTitle,
  submitLoadingTitle,
  isOpen,
  onClose,
  onSubmit,
  formRef,
  formValid,
  isLoading,
  onClick,
  children
}) {

  return (
    <div
      onClick={onClick}
      className={
        isOpen
          ? `popup popup_type_${name} popup_opened`
          : `popup popup_type_${name}`
      }>

      <div className="popup__container">

        <form
          ref={formRef}
          className="popup__form"
          name={formName}
          _id=""
          onSubmit={onSubmit}
          noValidate
        >

          <h2 className="popup__title">{formTitle}</h2>

          {children}

          <button
            className={
              formValid
                ? "popup__save-button"
                : "popup__save-button popup__save-button_disabled"
            }
            type="submit">{isLoading ? `${submitLoadingTitle}...` : submitTitle}</button>

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
