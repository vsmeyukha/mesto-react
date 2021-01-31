import React from 'react';
import PopupWithForm from './PopupWithForm';
import currentUserContext from '../contexts/CurrentUserContext';

function EditAvatarPopup(props) {

  // const [avatarLink, setAvatarLink] = React.useState('');

  const avatarInputRef = React.useRef('');

  // const thisUser = React.useContext(currentUserContext);

  // React.useEffect(() => {
  //   setAvatarLink(thisUser.avatar);
  // }, [thisUser]);

  // function handleAvatarInputChange(e) {
  //   setAvatarLink(avatarInputRef.current.value);
  // }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarInputRef.current.value
    })
  }

  return (
    <PopupWithForm
      title="Изменить аватар"
      name="change-avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="popup__input popup__input_type_avatar-link"
        placeholder="Ссылка на аву"
        name="avatar-link"
        required
        id="avatar-link"
        ref={avatarInputRef}

      />
      <span
        className="popup__input-error"
        id="avatar-link-error">
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;