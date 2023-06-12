import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

function Login({handleLogin, loggedIn}) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  })
  
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);

  function handleChange(e) {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function onLogin(e) {
    e.preventDefault();
    handleLogin(formValue.password, formValue.email);
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