import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = ( 
    `gallery__like ${isLiked && 'gallery__like_active'}` 
  );
  
  function handleCardClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <div className="gallery">
      <img onClick={handleCardClick} src={card.link} alt={card.name} className="gallery__image" />
      {isOwn && <button className='gallery__bin' onClick={handleCardDelete}></button>}
      <div className="gallery__place">
        <h2 className="gallery__caption">{card.name}</h2>
        <div className="gallery__container">
          <button onClick={handleCardLike} type="button" aria-label="like card" className={cardLikeButtonClassName}></button>
          <div className="gallery__counter">{card.likes.length}</div>
        </div>
      </div> 
    </div>
  );
}
  
export default Card;