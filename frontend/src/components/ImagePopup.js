import React from "react";
import usePopupClose from '../hooks/usePopupClose.js';

function ImagePopup(props) {

  usePopupClose(props.card.isOpen, props.onClose)

  return (
    <div
      className={`popup popup-image ${props.card.isOpen ? 'popup_opened' : false}`}
    >
      <div className="popup-image__container">
        <button
          className="popup__button-close"
          onClick={props.onClose}
          type="button">
        </button>
        <img
          className="popup-image__image"
          src={props.card.element.link}
          alt={`Картинка - ${props.card.element.name}`} />
        <p className="popup-image__title">{props.card.element.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;