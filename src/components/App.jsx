import { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import "../index.css";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import Confirmation from "./Confirmation.jsx";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [user, loadedCards] = await Promise.all([api.getUserInfo(), api.getCards()]);
        setCurrentUser(user);
        setCards(loadedCards);
        setLoadError(false);
      } catch (err) {
        console.error("Ошибка при получении данных: ", err);
        setLoadError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleLikeClick = async (card) => {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    try {
      const updatedCard = isLiked ? await api.deleteLikeCard(card._id) : await api.putLikeCard(card._id);

      setCards((state) => state.map((c) => (c._id === card._id ? updatedCard : c)));
    } catch (err) {
      console.error("Ошибка при установке лайка:", err);
    }
  };

  const handleDeleteClick = (card) => {
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
      console.error("Ошибка удаления лайка:", err);
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
      setCards((currentCards) => [newCard, ...currentCards]);
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
          isLoading={isLoading}
          loadError={loadError}
        />
        <Footer />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <Confirmation isOpen={confirmationOpen} onClose={closeAllPopups} onConfirm={handleConfirmDelete} />

        {isEditProfilePopupOpen && (
          <EditProfilePopup isOpen onClose={closeAllPopups} onUpdateUser={handleUpdateUser}></EditProfilePopup>
        )}

        {isEditAvatarPopupOpen && (
          <EditAvatarPopup isOpen onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}></EditAvatarPopup>
        )}

        {isAddPlacePopupOpen && (
          <AddPlacePopup isOpen onClose={closeAllPopups} onAddPlace={handleAddPlace}></AddPlacePopup>
        )}
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
