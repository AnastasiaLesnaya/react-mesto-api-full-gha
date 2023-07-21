import React from 'react';

function PopupWithForm (props) {
  return (
    <div className={ `popup ${ props.isOpen ? 'popup_opened' : '' }` } id={ props.id }>
      <div className="popup__container">
        <button type="button" className="button popup__close" onClick={ props.onClose } aria-label="Закрыть" />
        <h2 className="popup__title">{ props.title }</h2>
        <form className="popup__form" name={ props.type } onSubmit={ props.onSubmit }>
          { props.children }
          <button type="submit" className="button popup__submit" aria-label="Сохранить/Подтвердить">{ props.buttonText || 'Сохранить' }</button>
        </form>
      </div>
    </div>
  )
}
export default PopupWithForm;