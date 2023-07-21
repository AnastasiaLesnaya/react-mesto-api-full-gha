import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register (props) {
  // стейты, данные инпутов
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmail (e) { 
    setEmail(e.target.value);
  }
  function handlePass (e) {
    setPassword(e.target.value);
  }

  function handleSubmitButton (e) {
    e.preventDefault();
    props.handleRegister(email, password);
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <div className="auth">
        <h3 className="auth__title">Регистрация</h3>
        <form className="auth__form" onSubmit={ handleSubmitButton }>
          <label htmlFor="email-input" className="auth__label">
            <input id="email-input" name="email" type="email" onChange={ handleEmail } value={ email || '' } className="auth__input"
                  placeholder="email" minLength="8" maxLength="40"  required />
            <span className="email-input-error auth__input-error" />
          </label>
          <label htmlFor="password-input" className="auth__label">
            <input id="password-input" name="password" type="password" onChange={ handlePass } value={ password || '' } className="auth__input"
                   placeholder="пароль" minLength="6" maxLength="18" required />
            <span className="password-input-error auth__input-error" />
          </label>
          <button type="submit" className="button auth__button" aria-label="Зарегистрироваться">Зарегистрироваться</button>
        </form>
        <div className='auth__register'>
          <p>Уже зарегистрированы?</p>
          <Link to="/sign-in" className="auth__link">Войти</Link>
        </div>
      </div>
    </>
  )
}

export default Register;