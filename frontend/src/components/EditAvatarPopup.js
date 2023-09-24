import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "react-hook-form";

function EditAvatarPopup(props) {

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset
  } = useForm({
    mode:"onChange",
    values: {
      avatar: ""
    }
  });

  function onSubmit(data) {
    props.onUpdateAvatar(data.avatar);
    reset();
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      titleBtn={props.isRender ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={() => {props.onClose(); reset();}}
      onSubmit={handleSubmit(onSubmit)}
      disableBtn={!isValid}
    >
      <input 
       className= "popup__text"
       placeholder= "Ссылка на картинку"
       type="url"
      {...register("avatar", {
        required: "Поле не может быть пустым",
        pattern: {
          // eslint-disable-next-line
          value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
          message: "Должна быть ссылка"
        }
      })}
      />
      <span className="popup__text-error">{
        // eslint-disable-next-line no-mixed-operators
        errors?.avatar && errors?.avatar.message || "" }</span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
