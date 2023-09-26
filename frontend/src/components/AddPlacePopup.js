import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "react-hook-form";

function AddPlacePopup(props) {

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset
  } = useForm({
    mode:"onChange",
    values: {
      name: "",
      link: ""
    }
  });

  function onSubmit(data) {
    data.preventDefault();
    props.onAddPlace({
      name: data.name,
      link: data.link,
    });
    reset();
  }

  return (
    <PopupWithForm
      name='add'
      title='Новое место'
      isOpen={props.isOpen}
      titleBtn={props.isRender ? 'Сохранение...' : 'Создать'}
      onClose={() => {props.onClose(); reset();}}
      onSubmit={handleSubmit(onSubmit)}
      disableBtn={!isValid}
    >
      <input 
      className= "popup__text"
      placeholder= "Название"
      type= "text"
      {...register("name", {
        required: "Поле не может быть пустым",
        minLength: {
          value: 2,
          message: "Имя должно содежать не менее 2-х символов"
        },
        maxLength: {
          value: 30,
          message: "Имя должно содежать не более 30 символов"
        }
      })}
      />
      <span className="popup__text-error">{
        // eslint-disable-next-line no-mixed-operators
        errors?.name && errors?.name.message || "" }</span>
       <input 
       className= "popup__text"
       placeholder= "Ссылка на картинку"
       type="url"
      {...register("link", {
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
        errors?.link && errors?.link.message || "" }</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
