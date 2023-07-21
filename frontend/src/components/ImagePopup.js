import React from 'react';

function ImagePopup (props) {
  return (
      <div className={ `popup popup_zoom ${ props.isOpen ? 'popup_opened' : '' }` } id={ props.id }>
        <div className="popup__container popup__container_zoom">
          <button type="button" className="button popup__close" onClick={ props.onClose } aria-label="close" />
          <img src={ props.card.link } className="popup__image" alt={ props.card.name } />
          <h2 className="popup__title popup__title_zoom">{ props.card.name }</h2>
        </div>
      </div>
  )
}

export default ImagePopup;