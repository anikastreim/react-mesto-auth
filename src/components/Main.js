import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__card">
          <button onClick={onEditAvatar} type="button" aria-label="edit profile image" className="profile__button">
            <img src={currentUser.avatar} alt="Аватар пользователя" className="profile__avatar" />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button onClick={onEditProfile} type="button" aria-label="open edit form" className="profile__edit"></button>
            <p className="profile__description">{currentUser.about}</p>    
          </div>
        </div>
        <button onClick={onAddPlace} type="button" aria-label="open add form" className="profile__add"></button>  
      </section>
      <section className="galleries">
        {cards.map(card => (
          <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
        ))}
      </section>
    </main>
  );
}

export default Main;
