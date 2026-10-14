import closePopupButton from "../images/popup/Close Icon.svg";
import successImage from "../images/InfoTooltip/success.svg";
import failImage from "../images/InfoTooltip/fail.svg";

export default function InfoToolTip({ isOpen, onClose, isSuccess }) {
  const message = isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз.";

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <section className={`info-tooltip ${isOpen ? "popup_active" : ""}`} onClick={handleOverlayClick}>
      <div className="info-tooltip__container">
        <button type="button" className="info-tooltip__close-button" onClick={onClose}>
          <img className="popup__close-icon" src={closePopupButton} alt="" />
        </button>
        <img src={isSuccess ? successImage : failImage} alt="" className="info-tooltip__image" />
        <p className="info-tooltip__text">{message}</p>
      </div>
    </section>
  );
}
