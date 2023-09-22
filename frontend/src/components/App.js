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
import * as auth from '../utils/auth.js';

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

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loggedIn) return;
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [loggedIn]);

  React.useEffect(() => {
    if (!loggedIn) return;
    api.getUserData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [loggedIn]);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkToken(token)
        .then(data => {
          if (data) {
            setEmail(data.data.email);
            handleLoggedIn();
            navigate('/', { replace: true });
          }
        })
    }
  }, [navigate]);


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
    api.postNewCard(cardData)
      .then((newCard) => {
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
    auth.registration(password, email)
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
  }

  function handleLogin(password, email) {
    auth.login(password, email)
      .then(data => {
        if (data.token) {
          setEmail(email);
          handleLoggedIn();
          localStorage.setItem('token', data.token);
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        handleInfoTooltip(false);
        console.log(err);
      })
  }

  function handleSignOut() {
    localStorage.removeItem('token');
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
            onCardLike={handleCardLike} />} />
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