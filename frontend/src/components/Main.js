import React, { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main (props) {
  // "подписка на контекст"
  const userItem = useContext(CurrentUserContext);
  
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-area">
          <img src={ userItem.avatar } className="profile__avatar" alt="аватар профиля" />
          < button
            type="button"
            className="profile__avatar-edit"
            aria-label="Редактировать аватар профиля"
            onClick={ props.onEditAvatar } />
        </div>
        <div className="profile__container">
          <div className="profile__info">
            <h1 className="profile__name">{ userItem.name }</h1>
            < button
            type="button"
            className="button profile__btn-edit"
            aria-label="Редактировать профиль"
            onClick={ props.onEditProfile } />
            </div>
            <p className="profile__description">{ userItem.about }</p>
        </div>
        < button
          type="button"
          className="button profile__btn-add"
          aria-label="Добавить место"
          onClick={ props.onAddPlace } />
      </section>
      <section className="cards">
        { props.cards.map((cardItem) => (
          < Card
            key = { cardItem._id }
            link = { cardItem.link }
            name = { cardItem.name }
            likeCount = { cardItem.likes.length }
            onCardClick = { props.onCardClick }
            onCardDelete = { props.onCardDelete }
            onCardLike = { props.onCardLike }
            card = { cardItem } />
        )) }
      </section>
    </main>
  )
}

export default Main;