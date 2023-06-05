import {useRef, useEffect} from "react";
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarInput = useRef();
  
  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
  }

  useEffect(() => {
    avatarInput.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} name={"update-avatar"} titleText={"Обновить аватар"} buttonText={"Сохранить"} children={"card"}>
      <input ref={avatarInput} required type="url" name="link" placeholder="https://somewebsite.com/someimage.jpg" id="update-input" className="popup__input popup__input_type_update" />
      <span className="popup__error update-input-error"></span>
    </PopupWithForm>
  );
}
    
export default EditAvatarPopup;