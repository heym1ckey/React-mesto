import logo from "../images/header/header-logo.svg";
import { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext";

export default function Header({ isLoggedIn, onLogout }) {
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);

  const isMainPage = location.pathname === "/";

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="" />

      <div className="header__info">
        {isMainPage && currentUser && (
          <>
            <span className="header__email">{currentUser?.email}</span>
            <button className="header__logout" type="button" onClick={onLogout}>
              Выйти
            </button>
          </>
        )}

        {location.pathname === "/sign-in" && (
          <Link className="header__link" to="/sign-up">
            Регистрация
          </Link>
        )}
        {location.pathname === "/sign-up" && (
          <Link className="header__link" to="/sign-in">
            Войти
          </Link>
        )}
      </div>
    </header>
  );
}
