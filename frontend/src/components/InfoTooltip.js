import React from 'react';
import success from '../images/icon/success.svg';
import error from '../images/icon/error.svg';
import { useLocation, useNavigate } from 'react-router-dom';


// окно авторизации
function InfoTooltip (props) {
  const location = useLocation();
  const navigate = useNavigate();
  // страница входа открывается только после успешной регистрации и закрытии попапа
  function redirectPopup () {
    if (props.status) { props.onClose()
      // переводим при выполнении условия
      if (location.pathname === '/sign-up') { navigate('/sign-in') }
    }
    props.onClose();
  }

  return (
    <div className={ `popup ${ props.isOpen ? 'popup_opened' : '' }` } id={ props.id }>
      <div className="popup__container">
        <button type="button" className="button popup__close" onClick={ redirectPopup } aria-label="Закрыть форму" />
         <div className="auth__info">
          { props.status ? (
            <>
              <img src={ success } className="auth__icon" alt="успешно" />
              <p className="auth__text">Вы успешно зарегистрировались!</p>
            </>
          ) : (
            <>
              <img src={ error } className="auth__icon" alt="ошибка" />
              <p className="auth__text">Что-то пошло не так! Попробуйте ещё раз.</p>
            </>
          ) }
        </div>
      </div>
    </div>
 )
}

export default InfoTooltip;