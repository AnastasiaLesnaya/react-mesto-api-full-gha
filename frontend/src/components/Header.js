import React from 'react';
import headerLogo from '../images/header-logo.svg';
import { Link } from 'react-router-dom';

function Header (props) {
  return (
    <header className="header">
      < img src={ headerLogo } className="header__logo" alt="логотип Место.Россия" />
      <div className="header__user-area">
        { props.isLoggedIn ? (
          // пользователь авторизован
          <>
            <p className="header__menu-item">{ props.email }</p>
            <Link to='/sign-in' className="button header__menu-item" onClick={ props.isLogout }>Выйти</Link>
          </>
        ) : (
          // пользователь не авторизован
          <>
              <Link to='/sign-in' className="button header__menu-item">Вход</Link>
              <Link to='/sign-up' className="button header__menu-item">Регистрация</Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Header;