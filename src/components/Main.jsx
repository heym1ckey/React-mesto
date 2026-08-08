import { useState, useEffect } from "react";
import avatar from "../images/Profile/Avatar-image.svg";
import api from "../utils/Api.js";
import Card from "./Card.jsx";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await api.getUserInfo();
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      } catch (err) {
        console.error("Ошибка при получении данных пользователя:", err);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const getCard = async () => {
      try {
        const data = await api.getCards();
        setCards(data);
      } catch (err) {
        console.error("Ошибка при получении данных пользователя:", err);
      }
    };

    getCard();
  }, []);

  return (
    <>
      <section className="profile">
        <div className="profile__intro">
          <div className="intro__avatar-box">
            {userAvatar && <img className="intro__image" src={userAvatar} alt="Аватар" />}
            {!userAvatar && <div className="intro__image-placeholder">Загрузка...</div>}
            <button className="intro__image-edit" onClick={onEditAvatar}></button>
          </div>
          <div className="intro__text">
            <div className="intro__name-button">
              <h2 className="intro__name">{userName}</h2>
              <button className="intro__button" onClick={onEditProfile}></button>
            </div>
            <p className="intro__activity">{userDescription}</p>
          </div>
        </div>
        <button className="profile__button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} />
        ))}
      </section>
    </>
  );
}
