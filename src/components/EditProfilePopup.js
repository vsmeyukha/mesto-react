import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  return (
    <PopupWithForm
            title="Как звать-то тебя?"
            name="user-info"
            isOpen={props.isOpen}
            onClose={props.closeAllPopups}>
              <input
                type="text"
                className="popup__input popup__input_type_name"
                placeholder="Имя"
                name="user-name"
                required
                minLength="2"
                maxLength="40"
                id="user-name"
              />
              <span className="popup__input-error" id="user-name-error"></span>
              <input
                type="text"
                className="popup__input popup__input_type_regalia"
                placeholder="Род деятельности"
                name="user-regalia"
                required
                minLength="2"
                maxLength="200"
                id="user-regalia"
              />
              <span className="popup__input-error" id="user-regalia-error"></span>
          </PopupWithForm>
  )
}

export default EditProfilePopup;