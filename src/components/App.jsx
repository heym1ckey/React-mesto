import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import Confirmation from "./Confirmation.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import InfoToolTip from "./InfoToolTip.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import "../index.css";
import api from "../utils/Api.js";
import * as auth from "../utils/Auth.js";
import { CurrentUserContext } from "../context/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const tokenCheck = async () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;

    try {
      const res = await auth.checkToken(jwt);

      if (res) {
        setCurrentUser(res);
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.error("Ошибка проверки токена:", err);
      localStorage.removeItem("jwt");
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    const loadData = async () => {
      try {
        const [user, loadedCards] = await Promise.all([api.getUserInfo(), api.getCards()]);
        setCurrentUser(user);
        setCards(loadedCards);
        setLoadError(true);
      } catch (err) {
        console.error("Ошибка при получении данных: ", err);
        setLoadError(true);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [isLoggedIn]);

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

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleShowSuccess = () => {
    setIsSuccess(true);
    setIsInfoToolTipOpen(true);
  };

  const handleShowFail = () => {
    setIsSuccess(false);
    setIsInfoToolTipOpen(true);
  };

  const handleLogin = async () => {
    await tokenCheck();
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/sign-in", { replace: true });
  };

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
    setConfirmationOpen(false);
    setIsInfoToolTipOpen(false);
    setCardToDelete(null);
  };

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header onLogout={handleLogout} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={isLoggedIn}
                element={
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
                }
              />
            }
          />
          <Route path="/sign-in" element={<Login onFail={handleShowFail} onLogin={handleLogin} />}></Route>
          <Route path="/sign-up" element={<Register onSuccess={handleShowSuccess} onFail={handleShowFail} />}></Route>
        </Routes>
        <Footer />

        <InfoToolTip isOpen={isInfoToolTipOpen} onClose={closeAllPopups} isSuccess={isSuccess}></InfoToolTip>

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
