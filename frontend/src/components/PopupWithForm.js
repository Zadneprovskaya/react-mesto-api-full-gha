import React from "react";
import usePopupClose from '../hooks/usePopupClose.js';

function PopupWithForm(props) {

  usePopupClose(props.isOpen, props.onClose)

  return (
    <div className={`popup popup-${props.name} ${props.isOpen ? 'popup_opened' : false}`}>
      <div className="popup__container">
        <button
          onClick={props.onClose}
          className="popup__button-close"
          type="button">
        </button>
        <form
          className="popup__form"
          name={`popup_${props.name}`}
          method="POST"
          onSubmit={props.onSubmit}
          noValidate>
          <h2 className={`popup__title popup__title_type_${props.name}`}>{props.title}</h2>
          <>{props.children}</>
          <button
            className={`popup__submit-btn popup__submit-btn_type_${props.name} ${props.disableBtn ? 'popup__submit-btn_type_invalid' : false}`}
            disabled={props.disableBtn}
            type="submit">
            {props.titleBtn}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;