import React, { useState, useEffect, useContext } from "react";
import avatar from "../images/Profile/Avatar-image.svg";
import api from "../utils/Api.js";
import Card from "./Card.jsx";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

export default function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const userInfo = useContext(CurrentUserContext);

  if (!userInfo) {
    return <div className="loading">Загрузка пользователя...</div>;
  }

  return (
    <>
      <section className="profile">
        <div className="profile__intro">
          <div className="intro__avatar-box">
            {userInfo.avatar && <img className="intro__image" src={userInfo.avatar} alt="Аватар" />}
            {!userInfo.avatar && <div className="intro__image-placeholder">Загрузка...</div>}
            <button className="intro__image-edit" onClick={onEditAvatar}></button>
          </div>
          <div className="intro__text">
            <div className="intro__name-button">
              <h2 className="intro__name">{userInfo.name}</h2>
              <button className="intro__button" onClick={onEditProfile}></button>
            </div>
            <p className="intro__activity">{userInfo.about}</p>
          </div>
        </div>
        <button className="profile__button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </>
  );
}
