import React, { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  if (!currentUser || !card || !card.owner) {
    return null;
  }

  function handleClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleDeleteCard() {
    console.log("Клик по удалению!");
    onCardDelete(card);
  }

  const isOwn = String(card.owner._id) === String(currentUser._id);

  const isLiked = card.likes.some((user) => user._id === currentUser._id);

  return (
    <div className="rectangle">
      <img src={card.link} alt={card.name} className="rectangle__image" onClick={handleClick} />
      <div className="rectangle__text-part">
        <h2 className="rectangle__header">{card.name}</h2>
        <div className="rectangle__like">
          <button
            className={`rectangle__button ${isLiked ? "rectangle__button_active" : ""}`}
            type="button"
            onClick={handleCardLike}
          ></button>
          <span className="rectangle__like__number">{card.likes.length}</span>
        </div>
      </div>
      {isOwn && <button className="rectangle__delete-button" type="button" onClick={handleDeleteCard}></button>}
    </div>
  );
}
