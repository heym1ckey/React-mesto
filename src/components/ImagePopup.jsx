import closePopupButton from "../images/popup/Close Icon.svg";

export default function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup-image ${card ? "popup_active" : ""} `}>
      <div className="popup-image__container">
        <button type="button" className="popup-image__button" onClick={onClose}>
          <img className="popup__close-icon" src={closePopupButton} alt="" />
        </button>
        {card && (
          <>
            <img src={card.link} alt={card.name} className="popup-image__picture" />
            <p className="popup-image__signature">{card.name}</p>
          </>
        )}
      </div>
    </section>
  );
}
