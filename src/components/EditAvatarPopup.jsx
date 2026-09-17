import React, { useEffect, useContext, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar }) {
  const [link, setLink] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser) {
      setLink(currentUser.avatar || "");
    }
  }, [currentUser]);

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: link,
    });
  }

  return (
    <PopupWithForm
      name="popup-avatar"
      title="Обновить аватар"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
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
            onChange={handleLinkChange}
            value={link}
          />
          <span className="popup__input-error input_avatar-link-error"></span>
        </div>
      </div>
    </PopupWithForm>
  );
}
