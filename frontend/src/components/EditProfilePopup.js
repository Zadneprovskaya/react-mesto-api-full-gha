import React from "react";
import { useForm } from "react-hook-form";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset
  } = useForm({
    mode:"onChange",
    values: {
      nameInput: currentUser.name,
      descriptionInput: currentUser.about
    }
  });

  function onSubmit(data) {
    props.onUpdateUser({
      name: data.nameInput,
      about: data.descriptionInput,
    });
    reset();
  }
  
  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      isOpen={props.isOpen}
      titleBtn={props.isRender ? 'Сохранение...' : 'Сохранить'}
      onClose={() => {props.onClose(); reset();}}
      onSubmit={handleSubmit(onSubmit)}
      disableBtn={!isValid}
    >
      <input 
      className= "popup__text"
      placeholder= "Имя"
      type= "text"
      {...register("nameInput", {
        required: "Поле не может быть пустым",
        minLength: {
          value: 2,
          message: "Имя должно содежать не менее 2-х символов"
        },
        maxLength: {
          value: 40,
          message: "Имя должно содежать не более 40 символов"
        }
      })}
      />
      <span className="popup__text-error">{
        // eslint-disable-next-line no-mixed-operators
        errors?.nameInput && errors?.nameInput.message || "" }</span>
       <input 
       className= "popup__text"
       placeholder= "Описание"
       type="text"
      {...register("descriptionInput", {
        required: "Поле не может быть пустым",
        minLength: {
          value: 2,
          message: "Имя должно содежать не менее 2-х символов"
        },
        maxLength: {
          value: 200,
          message: "Имя должно содежать не более 200 символов"
        }
      })}
      />
      <span className="popup__text-error">{
        // eslint-disable-next-line no-mixed-operators
        errors?.descriptionInput && errors?.descriptionInput.message || "" }</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;