import { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import avatar from "../images/Profile/Avatar-image.svg";

import "../index.css";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [count, setCount] = useState(0);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState();
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState();
  const [selectedCard, setSelectedCard] = useState(null);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <>
      <Header />
      <Main
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
      />
      <Footer />

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <PopupWithForm
        name="popup"
        title="Редактировать профиль"
        buttonTitle="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup__inputs">
          <div>
            <input
              id="input-name"
              name="name"
              className="popup__input popup__input-name"
              type="text"
              minLength="2"
              maxLength="40"
              placeholder="Имя"
              required
            />
            <span className="popup__input-error input-name-error"></span>
          </div>
          <div>
            <input
              id="input-activity"
              name="about"
              className="popup__input popup__input-activity"
              type="text"
              minLength="2"
              maxLength="200"
              placeholder="Род деятельности"
              required
            />
            <span className="popup__input-error input-activity-error"></span>
          </div>
        </div>
      </PopupWithForm>

      <PopupWithForm
        name="popup-add"
        title="Новое место"
        buttonTitle="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup-add__inputs">
          <div>
            <input
              id="input_add-name"
              name="name"
              className="popup-add__input popup-add__input-name"
              type="text"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="popup__input-error input_add-name-error"></span>
          </div>
          <div>
            <input
              id="input_add-link"
              name="link"
              className="popup-add__input popup-add__input-link"
              type="url"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup__input-error input_add-link-error"></span>
          </div>
        </div>
      </PopupWithForm>

      <PopupWithForm name="popup-delete" title="Вы уверены?" buttonTitle="Да" onClose={closeAllPopups} />

      <PopupWithForm
        name="popup-avatar"
        title="Обновить аватар"
        buttonTitle="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <div className="popup-avatar__inputs">
          <div>
            <input
              id="input_avatar-link"
              name="avatar"
              className="popup-avatar__input popup-avatar__input-link"
              type="url"
              placeholder="Ссылка на аватар"
              required
            />
            <span className="popup__input-error input_avatar-link-error"></span>
          </div>
        </div>
      </PopupWithForm>
    </>
  );
}

export default App;
