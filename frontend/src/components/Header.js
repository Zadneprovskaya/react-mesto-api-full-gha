/* eslint-disable jsx-a11y/alt-text */
import headerLogo from '../images/Vector.svg';
import headerProperties from '../images/Line 42.svg';
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header({ email, onSignOut }) {
    const [windowSize, setWindowSize] = React.useState(false);
    const [buttonShow, setButtonShow] = React.useState(false);
    const location = useLocation();
    const path = location.pathname;

    React.useEffect(() => {
        setWindowSize(window.innerWidth > 600 ? true : false);
        const handleWindowResize = () => {
            setWindowSize(window.innerWidth > 600 ? true : false);
        };

        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };

    }, []);

    function handleButtonShowClick() {
        setButtonShow(true);
    }

    function handleButtonCloseClick() {
        setButtonShow(false);
    }

    function handleSubmit() {
        onSignOut();
        handleButtonCloseClick();
    }

    const links = {
        "/sign-up": (
            <Link className="header__link" to="/sign-in">
                Вход
            </Link>
        ),
        "/sign-in": (
            <Link className="header__link" to="/sign-up">
                Регистрация
            </Link>
        ),
        "/": (
            <Link className="header__link header__link_blackout " to="/sign-in" onClick={handleSubmit}>
                Выйти
            </Link>
        ),
    };

    return (
        <div>
            <div className={`${windowSize ? 'header_visible' : path === '/' && buttonShow ? 'header__list' : 'header_visible'}`}>
                <p className="header__email header__email_list">{email}</p>
                {links[path]}
            </div>
            <header className="header">
                <div className=" header__container">
                    <img className="header__logo" src={headerLogo} alt="Логотип Mesto" />
                    <div className={`${windowSize || path !== '/' ? 'header__info' : 'header_visible'}`}>
                        <p className={`${windowSize && path === '/' ? 'header__email' : 'header_visible'}`}>{email}</p>
                        {links[path]}
                    </div>
                    <button
                        onClick={handleButtonShowClick}
                        className={`${path !== '/' ? 'header_visible' : windowSize ? 'header_visible' : buttonShow ? 'header_visible' : 'header__button header__button_type_properties'}`}
                        type="button">
                        <img className='header__button-properties' src={headerProperties} />
                        <img className='header__button-properties' src={headerProperties} />
                        <img className='header__button-properties' src={headerProperties} />
                    </button>
                    <button
                        onClick={handleButtonCloseClick}
                        className={`${path !== '/' ? 'header_visible' : windowSize ? 'header_visible' : buttonShow ? 'header__button header__button_type_close' : 'header_visible'}`}
                        type="button">
                    </button>
                </div>
            </header>
        </div>
    )
}

export default Header;