import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card (props) {
 // "подписка на контекст"
 const userItem = useContext(CurrentUserContext);

 // определяем, являемся ли владельцем текущей карточки
 const isOwn = props.card.owner === userItem._id;
// определяем, есть ли у карточки лайк, поставленный текущим пользователем
const isLiked = props.card.likes.some(item => item === userItem._id);

  // функции зума, удаления картинки, лайка
  function handleClick () { props.onCardClick(props.card) }
  function handleDelete () { props.onCardDelete(props.card) }
  function handleLike () { props.onCardLike(props.card) }

// в разметке используем переменную для условного рендеринга
  return (
    <div className="cards__item">
      {isOwn && <button className="button cards__btn-delete" onClick={ handleDelete } type="button" aria-label="delete" />}
      <img src={ props.link } className="cards__image button cards__btn-zoom" onClick={ handleClick } alt={ props.name } />
      <div className="cards__info">
        <h2 className="cards__title">{ props.name }</h2>
        <div className="cards__like-area">
          <button type="button" className={ `cards__btn-like button ${ isLiked ? 'cards__btn-like_active' : '' }` } onClick={ handleLike } aria-label="like" />
          <p className="cards__like-counter">{ props.likeCount > 0 ? props.likeCount : null }</p>
        </div>
      </div>
    </div>
  )
}

export default Card;