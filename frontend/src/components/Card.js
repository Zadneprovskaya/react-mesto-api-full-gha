import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}`
  );

  function handleClick(event) {
    if (!event.target.classList.contains('element__trash')) {
      props.onCardClick(props.card);
    }
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="element">
      <div
        className="element__image"
        style={{ backgroundImage: `url(${props.card.link})` }}
        onClick={handleClick}>
        <button
          className={`element__trash ${isOwn ? 'element__trash_visible' : false}`}
          onClick={handleDeleteClick}
          type="button">
        </button>
      </div>
      <div className="element__group">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__group-like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}>
          </button>
          <p className="element__count-like">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;