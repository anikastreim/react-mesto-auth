import error from '../images/error.svg';
import success from '../images/success.svg';

function InfoTooltip({isOpen, onClose, isSuccess}) {

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`} id={`popup-info`}>
      <div className="popup__container">
        <button onClick={onClose} type="button" className="popup__close" ></button>
        <img className="popup__info" src={isSuccess ? success : error} alt="Сообщение о завершении регистрации"/>
        <h2 className="popup__caption">{isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;