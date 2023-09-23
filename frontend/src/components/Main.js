import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="container">
      <section className="profile">
        <div className="profile-image">
          <img className="profile-image__avatar" src={currentUser.avatar} alt="Аватар" />
          <button
            className="profile-image__change-button"
            onClick={props.onEditAvatar}
            type="button"
            aria-label="Изменить аватар">
          </button>
        </div>
        <div className="profile-info">
          <h1 className="profile-info__name">{currentUser.name}</h1>
          <button
            className="profile-info__edit-button"
            onClick={props.onEditProfile}
            type="button">
          </button>
          <p className="profile-info__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          onClick={props.onAddPlace}
          type="button">
        </button>
      </section>
      <section className="list-of-elements" aria-label="Список карточек">
        <ul className="elements">
          {props.cards.map((card) => (
            <Card
              key={card['_id']}
              card={card}
              onCardClick={props.onCardClick}
              onCardDelete={props.onCardDelete}
              onCardLike={props.onCardLike}
            />)
          )}
        </ul>
      </section>
    </main>
  )
}

export default Main;