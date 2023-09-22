import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Register({ onRegister }) {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur",
        values: {
            email: "",
            password: ""
        }
    });

    function onSubmit(data) {
        onRegister(data.password, data.email);
        reset();
    }

    return (
        <div className="container sign">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="sign__form"
                name="signup"
                method="POST">
                <h1 className="sign__title">Регистрация</h1>
                <input
                    className="sign__input"
                    placeholder="Email"
                    type="email"
                    {...register("email", {
                        required: "Поле не может быть пустым",
                        minLength: {
                            value: 6,
                            message: "Поле должно содежать не менее 6 символов"
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Должен быть адрес"
                        }
                    })}>
                </input>
                <span className="sign__input-error">{
                    // eslint-disable-next-line no-mixed-operators
                    errors?.email && errors?.email.message || ""}</span>
                <input
                    className="sign__input"
                    placeholder="Пароль"
                    type="password"
                    {...register("password", {
                        required: "Поле не может быть пустым",
                        minLength: {
                            value: 8,
                            message: "Поле должно содежать не менее 8 символов"
                        },
                        maxLength: {
                            value: 16,
                            message: "Поле должно содежать не более 16 символов"
                        }
                    })}></input>
                <span className="sign__input-error">{
                    // eslint-disable-next-line no-mixed-operators
                    errors?.password && errors?.password.message || ""}</span>

                <button
                    type="submit"
                    className={`sign__button ${!isValid ? 'sign__button_type_invalid' : false}`}
                >Зарегистрироваться</button>
                <div className="sign__link">
                    <Link className="sign__link-style" to="/sign-in">
                        Уже зарегистрированы? Войти
                    </Link>
                </div>

            </form>
        </div>

    )
}

export default Register;