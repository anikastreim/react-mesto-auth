import {useState} from "react";
import {Link} from "react-router-dom";

function Register({handleRegister}) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  })

  function handleChange(e) {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  function onRegister(e) {
    e.preventDefault();
    handleRegister(formValue.email, formValue.password);
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <h2 className="auth__title">Регистрация</h2>
        <form onSubmit={onRegister} className="auth__form">
          <input value={formValue.email} onChange={handleChange} required type="email" name="email" placeholder="Email" id="email-input" className="auth__input auth__input_type_email" />
          <input value={formValue.password} onChange={handleChange} required type="password" name="password" placeholder="Пароль" id="password-input" minLength="6" className="auth__input auth__input_type_password" />
          <button type="submit" aria-label="sign in" className="auth__save">Зарегистрироваться</button>
        </form>
        <div className="auth__signin">
          <p className="auth__text">Уже зарегистрированы? <Link to="/sign-in" className="auth__link">Войти</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;