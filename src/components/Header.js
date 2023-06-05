import headerLogo from '../images/logo.svg';

function Header() {
  return (
    <div className="header">
      <img src={headerLogo} alt="Логотип проекта" className="header__logo" />
    </div>
  );
}

export default Header;