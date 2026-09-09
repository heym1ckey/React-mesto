import { Children } from "react";
import closePopupButton from "../images/popup/Close Icon.svg";

export default function PopupWithForm({ title, name, buttonTitle, children, isOpen, onClose, onSubmit }) {
  return (
    <>
      <section className={`${name} ${isOpen ? "popup_active" : ""}`}>
        <form className="popup__container" name={name} onSubmit={onSubmit} action="">
          <button type="button" className="popup__button" onClick={onClose}>
            <img className="popup__close-icon" src={closePopupButton} alt="" />
          </button>
          <h2 className="popup__header">{title}</h2>
          {children}
          <button className="popup__form-button" type="submit">
            {buttonTitle}
          </button>
        </form>
      </section>
    </>
  );
}
