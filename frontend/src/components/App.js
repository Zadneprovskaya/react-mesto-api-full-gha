import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import ConfirmDeletionPopup from "./ConfirmDeletionPopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./NotFound";
import InfoTooltip from "./InfoTooltip";

import api from '../utils/api.js';
import { registration } from '../utils/auth.js';
import { checkToken } from '../utils/auth.js';
import { login } from '../utils/auth.js';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmDeletionPopupOpen, setIsConfirmDeletionPopupOpen] = React.useState({ isOpen: false, card: {} });
  const [isInfoTooltip, setInfoTooltip] = React.useState({ isOpen: false, result: false });

  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false, element: {} });
  const [cards, setCards] = React.useState([]);
  const [renderLoading, setRenderLoading] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});

  /* const [currentUser, setCurrentUser] = React.useState({
    _id: '',
    email: '',
    name: '',
    about: '',
    avatar: ''
  }); */

  /* const [userData, setUserData] = React.useState({
    _id: '',
    email: ''
  }); */

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();

  /* const getToken = React.useCallback(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setRenderLoading(true);

      checkToken(token)
        .then((res) => {
          const { _id, email } = res;
          const userData = {
            _id,
            email
          };
          console.log(`useCallback -> checkToken -> userData: ${_id}`);
          setEmail(userData.email);
          setCurrentUser(userData);
          handleLoggedIn();
          navigate('/', { replace: true });
        })
        .catch((err) => {
          console.log(`Ошибка в процессе проверки токена пользователя и получения личных данных: ${err}`);
        })
        .finally(() => {
          setRenderLoading(false);
        })
    };
  }, [navigate]);

  React.useEffect(() => {
    getToken();
  }, [getToken]);

  React.useEffect(() => {
    if (loggedIn) {
      setRenderLoading(true);

      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([user, cards]) => {
          console.log(`Promise: ${[user, cards]}`);
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.log(`Ошибка в процессе загрузки данных пользователя и галереи карточек: ${err}`);
        })
        .finally(() => {
          setRenderLoading(false);
        })
    };
  }, [loggedIn]); */


  React.useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      checkToken(token)
        .then((data) => {
          handleLoggedIn();
          setEmail(data.email);
        })
        .then(() => {
          navigate("/", {replace: true});
        });

      Promise.all([ api.getUserData(), api.getInitialCards() ])
        .then(res => {
          const [ userData, cardsArray ] = res;
          setCards(cardsArray);
          setCurrentUser(userData);
        })
        .catch(err => console.log(err));
    }
  }, [navigate])



 /*  React.useEffect(() => {
    setRenderLoading(true);
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token)
        .then(data => {
          if (data) {
            setEmail(data.email);
            setCurrentUser(data);
            handleLoggedIn();
            navigate('/', { replace: true });
          }
        });

        Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.log(`Ошибка в процессе загрузки данных пользователя и галереи карточек: ${err}`);
        })
        .finally(() => {
          setRenderLoading(false);
        })
    }
  }, [navigate]);
  */

  /* React.useEffect(() => {
    setRenderLoading(true);
    const token = localStorage.getItem('token');
    console.log(token);
    if (loggedIn) {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
    };
  }, [loggedIn]);

  React.useEffect(() => {
    setRenderLoading(true);
    const token = localStorage.getItem('token');
    console.log(token);
    if (loggedIn) {
    api.getUserData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      })
    };
  }, [loggedIn]);  */

  function handleLoggedIn() {
    setLoggedIn(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfirmDeletionClick(card) {
    setIsConfirmDeletionPopupOpen({ ...isConfirmDeletionPopupOpen, isOpen: true, card: card });
  }

  function handleInfoTooltip(result) {
    setInfoTooltip({ ...isInfoTooltip, isOpen: true, result: result });
  }

  function handleCardClick(card) {
    setSelectedCard({ ...selectedCard, isOpen: true, element: card });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ ...selectedCard, isOpen: false });
    setIsConfirmDeletionPopupOpen({ ...isConfirmDeletionPopupOpen, isOpen: false });
    setInfoTooltip(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    //const token = localStorage.getItem('token');
    if (isLiked) {
      api.dislikedCard(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api.likedCard(card._id)
        .then((newCard) => {
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
          setCards(newCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    setRenderLoading(true);
    //const token = localStorage.getItem('token');
    api.removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  }

  function handleUpdateUser(newUser) {
    setRenderLoading(true);
    //const token = localStorage.getItem('token');
    api.saveUserChanges(newUser)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  }

  function handleUpdateAvatar(newAvatar) {
    setRenderLoading(true);
    //const token = localStorage.getItem('token');
    api.changedAvatar(newAvatar)
      .then((data) => {
        setCurrentUser({ ...currentUser, avatar: data.avatar });
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  }

  function handleAddPlaceSubmit(cardData) {
    setRenderLoading(true);
    //const token = localStorage.getItem('token');
    api.postNewCard(cardData)
      .then((newCard) => {
        console.log(newCard);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  }

  function handleRegister(password, email) {
    setRenderLoading(true);
    registration(password, email)
      .then(data => {
        if (data) {
          handleInfoTooltip(true);
          navigate('/sign-in', { replace: true });
        }
      })
      .catch(err => {
        console.log(err);
        handleInfoTooltip(false);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  }

  function handleLogin(password, email) {
    setRenderLoading(true);
    //const token = localStorage.getItem('token');
    //console.log(`token: ${token}`);
    login(password, email)
      .then(data => {
        if (data) {
          //localStorage.setItem('token',data.token);
          setEmail(email);
          setCurrentUser(data);
          api.getUserData();
          handleLoggedIn();
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        handleInfoTooltip(false);
        console.log(err);
      })
      .finally(() => {
        setRenderLoading(false);
      });
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    //getLogoutUser();
    setLoggedIn(false);
    setEmail('');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header email={email} onSignOut={handleSignOut} />
        <Routes>

          <Route path="/" element={<ProtectedRoute
            element={Main}
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardDelete={handleConfirmDeletionClick}
            onCardLike={handleCardLike}
           />} />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="/not-found" element={<NotFound loggedIn={loggedIn} />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
        <Footer />
        <InfoTooltip
          result={isInfoTooltip}
          onClose={closeAllPopups}

        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isRender={renderLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isRender={renderLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isRender={renderLoading}
        />

        <ConfirmDeletionPopup
          deleteCard={isConfirmDeletionPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isRender={renderLoading}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;