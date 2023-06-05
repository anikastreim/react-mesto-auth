function ImagePopup({card, onClose}) {

  return (
    <div className={`popup popup-image ${card && "popup_opened"}`}>
      <div className="popup-image__container">
        <button onClick={onClose} type="button" aria-label="close popup" className="popup__close"></button>
        <img src={card && card.link} alt={card && card.name} className="popup-image__image" />
        <h2 className="popup-image__caption">{card && card.name}</h2>
      </div>
    </div>
  );
}
  
export default ImagePopup;