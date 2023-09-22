import React from "react";

import usePopupClose from '../hooks/usePopupClose.js';
import OK_img from '../images/Union.svg';
import ERR_img from '../images/Union2.svg';

function InfoTooltip({ onClose, result: { isOpen, result } }) {

    usePopupClose(isOpen, onClose);

    return (
        <div className={`popup popup-info ${isOpen ? 'popup_opened' : false}`} >
            <div className="popup__container popup__container-info">
                <button
                    onClick={onClose}

                    className="popup__button-close"
                    type="button">
                </button>
                <img src={result ? OK_img : ERR_img} alt="Результат операции" className="popup-info__image" />
                <h1 className="popup-info__title">{result ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h1>
            </div>
        </div>
    )
}

export default InfoTooltip;