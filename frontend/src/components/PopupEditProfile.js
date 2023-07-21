import React, { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function PopupEditProfile (props) {
  // "подписка на контекст"
  const currentUser = useContext(CurrentUserContext);
// стейт-переменные
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

// После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about)
  }, [props.isOpen, currentUser.name, currentUser.about] );

  
  function handleSubmit (event) {
// Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
// Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name, 
      about: description 
    });
  }
  function handleName (event) {
    setName(event.target.value) 
  }

  function handleDescription (event) {
    setDescription(event.target.value) 
  }

  return (
    < PopupWithForm
      isOpen = { props.isOpen }
      onClose = { props.onClose }
      onSubmit = { handleSubmit }
      id = 'profile-popup'
      title = 'Редактировать профиль'
      type = 'profile' >
        <label htmlFor="username-input" className="popup__label">
          <input id="username-input" type="text" className="popup__input"
                 name="username" placeholder="Введите имя" minLength="2" maxLength="40" value={ name || '' } onChange={ handleName } required />
          <span className="username-input-error popup__input-error" />
        </label>
        <label htmlFor="description-input" className="popup__label">
          <input id="description-input" type="text" className="popup__input"
                 name="description" placeholder="О себе" minLength="2" maxLength="200" value={ description || '' } onChange={ handleDescription } required />
          <span className="description-input-error popup__input-error" />
        </label>
    </PopupWithForm>
  )
}

export default PopupEditProfile;