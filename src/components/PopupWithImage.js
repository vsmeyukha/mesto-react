import React from 'react';

function PopupWithImage(props) {
  return (
    <div className={`photo-popup ${props.card ? 'popup_opened' : ''}`}>
      <figure className="photo-popup__container">
        <button className="popup__close-button popup__close-button_type_photo-popup" type="button" onClick={props.onClose}></button>
        <img src={props.card} alt="" className="photo-popup__image" />
        <figcaption className="photo-popup__caption"></figcaption>
      </figure>
    </div>
  )
}

export default PopupWithImage;