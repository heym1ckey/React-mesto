import React from "react";
import closePopupButton from "../images/popup/Close Icon.svg";
import handleOverlayClick from "../utils/OverlayClose";
handleOverlayClick;

export default function Confirmation({ isOpen, onConfirm, onClose }) {
  return (
    <section className={`popup-delete ${isOpen ? "popup_active" : ""}`} onClick={(e) => handleOverlayClick(e, onClose)}>
      <form className="popup-delete__container" action="">
        <button className="popup-delete__close-button" type="button" onClick={onClose}>
          <img className="popup__close-icon" src={closePopupButton} alt="" />
        </button>
        <h2 className="popup-delete__header">Вы уверены?</h2>
        <button className="popup-delete__form-button" type="button" onClick={onConfirm}>
          Да
        </button>
      </form>
    </section>
  );
}
