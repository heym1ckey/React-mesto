export default function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <div className="rectangle">
      <img src={card.link} alt={card.name} className="rectangle__image" onClick={handleClick} />
      <div className="rectangle__text-part">
        <h2 className="rectangle__header">{card.name}</h2>
        <div className="rectangle__like">
          <button className="rectangle__button" type="button"></button>
          <span className="rectangle__like__number">{card.likes.length}</span>
        </div>
      </div>
      <button className="rectangle__delete-button" type="button"></button>
    </div>
  );
}
