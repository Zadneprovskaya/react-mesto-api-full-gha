import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeletionPopup(props) {

  function handleSubmit(event) {
    event.preventDefault();
    props.onCardDelete(props.deleteCard.card);
  }

  return (
    <PopupWithForm
      name='confirm'
      title='Вы уверены?'
      titleBtn={props.isRender ? 'Удаление...' : 'Да'}
      isOpen={props.deleteCard.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default ConfirmDeletionPopup;