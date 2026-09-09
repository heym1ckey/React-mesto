import React, { useEffect, useContext, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ onClose, isOpen, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }
  return (
    <PopupWithForm
      name="popup-add"
      title="Новое место"
      buttonTitle="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
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
            value={name}
            onChange={handleNameChange}
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
            onChange={handleLinkChange}
            value={link}
          />
          <span className="popup__input-error input_add-link-error"></span>
        </div>
      </div>
    </PopupWithForm>
  );
}
