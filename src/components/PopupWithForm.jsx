import { useState, useEffect } from "react";
import closePopupButton from "../images/popup/Close Icon.svg";

export default function PopupWithForm({
  title,
  name,
  loadingButtonTitle,
  buttonTitle,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmit(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <section className={`${name} ${isOpen ? "popup_active" : ""}`} onClick={handleOverlayClick}>
        <form className={`popup__container ${name}__container`} name={name} onSubmit={handleSubmit} action="">
          <button type="button" className="popup__button" onClick={onClose}>
            <img className="popup__close-icon" src={closePopupButton} alt="" />
          </button>
          <h2 className="popup__header">{title}</h2>
          {children}
          <button className="popup__form-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? loadingButtonTitle || `${buttonTitle}...` : buttonTitle}
          </button>
        </form>
      </section>
    </>
  );
}
