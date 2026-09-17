import React, { use, useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setDescription(currentUser.about || "");
    }
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="popup"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
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
            value={name}
            onChange={handleNameChange}
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
            value={description}
            onChange={handleDescriptionChange}
            required
          />
          <span className="popup__input-error input-activity-error"></span>
        </div>
      </div>
    </PopupWithForm>
  );
}
