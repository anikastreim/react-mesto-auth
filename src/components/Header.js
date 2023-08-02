import {Link, Routes, Route} from "react-router-dom";
import headerLogo from '../images/logo.svg';

function Header({userEmail, onSignOut}) {

  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип проекта" className="header__logo" />
      <Routes>
        <Route path="/sign-in" element={<Link to="/sign-up" className="header__auth">Регистрация</Link>} />
        <Route path="/sign-up" element={<Link to="/sign-in" className="header__auth">Войти</Link>} />
        <Route path="/" element={
          <div className="header__container">
            <p className="header__email">{userEmail}</p>
            <button className="header__exit" onClick={onSignOut} type="button">Выйти</button>
          </div>
        }
        />
      </Routes>
    </header>
  );
}

export default Header;