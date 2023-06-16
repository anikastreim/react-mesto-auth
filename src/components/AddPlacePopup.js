import {useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
  const [titleInput, setTitle] = useState("");
  const [linkInput, setLink] = useState("");

  useEffect(() => {
    setTitle("");
    setLink("");
  }, [isOpen]);
  
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: titleInput,
      link: linkInput, 
    });
  }

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} name={"add-place"} titleText={"Новое место"} buttonText={"Создать"} children={"card"}>
      <input value={titleInput} onChange={e => setTitle(e.target.value)} required type="text" name="name" placeholder="Название" id="title-input" minLength="2" maxLength="30" className="popup__input popup__input_type_title" />
      <span className="popup__error title-input-error"></span>
      <input value={linkInput} onChange={e => setLink(e.target.value)} required type="url" name="link" placeholder="Ссылка на картинку" id="link-input" className="popup__input popup__input_type_link" />
      <span className="popup__error link-input-error"></span>
  </PopupWithForm>
  );
}
    
export default AddPlacePopup;