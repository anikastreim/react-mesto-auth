import {useState, useEffect, useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm"

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);
  
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} name={"edit-profile"} titleText={"Редактировать профиль"} buttonText={"Сохранить"} children={"card"}>
      <input value={name || ''} onChange={e => setName(e.target.value)} required type="text" name="name" placeholder="Имя" id="name-input" minLength="2" maxLength="40" className="popup__input popup__input_type_name" />
      <span className="popup__error name-input-error"></span>
      <input value={description || ''} onChange={e => setDescription(e.target.value)}  required type="text" name="about" placeholder="О себе" id="description-input" minLength="2" maxLength="200" className="popup__input popup__input_type_description" />
      <span className="popup__error description-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;