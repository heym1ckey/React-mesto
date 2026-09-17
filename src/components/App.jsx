import React, { useState, useEffect, use } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import "../index.css";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import Confirmation from "./Confirmation.jsx";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState();
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (currentUser) {
      api.getCards().then(setCards);
    }
  }, [currentUser]);

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await api.getUserInfo();
        setCurrentUser(data);
      } catch (err) {
        console.error("Ошибка при получении данных пользователя:", err);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLikeClick = async (card) => {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    try {
      const updatedCard = isLiked ? await api.deleteLikeCard(card._id) : await api.putLikeCard(card._id);

      setCards((state) => state.map((c) => (c._id === card._id ? updatedCard : c)));
    } catch (err) {
      console.error("Ошибка при изменении лайка:", err);
    }
  };

  const handleDeleteClick = (card) => {
    console.log("handleDeleteClick вызван:", card);
    setCardToDelete(card);
    setConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!cardToDelete) return;

    try {
      await api.deleteCard(cardToDelete._id);

      setCards((state) => state.filter((c) => c._id !== cardToDelete._id));
      closeAllPopups();
    } catch (err) {
      console.error("Ошибка при изменении лайка:", err);
    }
  };

  const handleUpdateUser = async ({ name, about }) => {
    try {
      const updateUser = await api.editUserInfo(name, about);
      setCurrentUser(updateUser);
      closeAllPopups();
    } catch (err) {
      console.log("Ошибка при обновлении профиля:", err);
    }
  };

  const handleUpdateAvatar = async ({ avatar }) => {
    try {
      const updateAvatar = await api.editUserAvatar(avatar);
      setCurrentUser(updateAvatar);
      closeAllPopups();
    } catch (err) {
      console.log("Ошибка при обновлении аватара:", err);
    }
  };

  const handleAddPlace = async ({ name, link }) => {
    try {
      const newCard = await api.addNewCards(name, link);
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch (err) {
      console.log("Ошибка при добавлении новой карточки:", err);
    }
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
    setConfirmationOpen(false);
    setCardToDelete(null);
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onEditProfile={() => {
            setIsEditProfilePopupOpen(true);
          }}
          onAddPlace={() => {
            setIsAddPlacePopupOpen(true);
          }}
          onEditAvatar={() => {
            setIsEditAvatarPopupOpen(true);
          }}
          onCardClick={handleCardClick}
          onCardLike={handleLikeClick}
          onCardDelete={handleDeleteClick}
        />
        <Footer />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <Confirmation isOpen={confirmationOpen} onClose={closeAllPopups} onConfirm={handleConfirmDelete} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        ></EditProfilePopup>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        ></AddPlacePopup>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
