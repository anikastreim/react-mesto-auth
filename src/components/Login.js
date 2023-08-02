import {useState} from "react";

function Login({handleLogin}) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  })

  function handleChange(e) {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function onLogin(e) {
    e.preventDefault();
    handleLogin(formValue.email, formValue.password);
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <h2 className="auth__title">Вход</h2>
        <form onSubmit={onLogin} className="auth__form">
          <input value={formValue.email} onChange={handleChange} required type="email" name="email" placeholder="Email" id="email-input" className="auth__input auth__input_type_email" />
          <input value={formValue.password} onChange={handleChange} required type="password" name="password" placeholder="Пароль" id="password-input" minLength="6" className="auth__input auth__input_type_password" />
          <button type="submit" aria-label="sign in" className="auth__save">Войти</button>
        </form>
      </div>
    </div>
  );
}
    
export default Login;