import React from 'react';
import PopupWithForm from './PopupWithForm';
import currentUserContext from '../contexts/CurrentUserContext';

function EditAvatarPopup(props) {

  const [avatarLink, setAvatarLink] = React.useState('');

  const avatarInputRef = React.useRef();

  function handleAvatarInputChange(e) {
    setAvatarLink(avatarInputRef.current.value);
    console.log(avatarLink);
  }

  return (
    <PopupWithForm
      title="Изменить аватар"
      name="change-avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <input
        type="url"
        className="popup__input popup__input_type_avatar-link"
        placeholder="Ссылка на аву"
        name="avatar-link"
        required
        id="avatar-link"
        ref={avatarInputRef}
        onChange={handleAvatarInputChange}
      />
      <span
        className="popup__input-error"
        id="avatar-link-error">
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;