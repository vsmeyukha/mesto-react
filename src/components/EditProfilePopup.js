import React from 'react';
import PopupWithForm from './PopupWithForm';
import currentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  // ! объявляем стейт-переменные, которые будут привязаны к полям ввода формы и сделают их управляемыми
  const [username, setUsername] = React.useState('');
  const [description, setDescription] = React.useState('');

  const thisUser = React.useContext(currentUserContext);
  
  React.useEffect(() => {
    setUsername(thisUser.name);
    setDescription(thisUser.about);
  }, [thisUser]);

  // ! функция изменения значения инпута имени
  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

    // ! функция изменения значения инпута описания
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  // ! функция сабмита формы
  function handleSubmit(e) {
    e.preventDefault();

    // ! Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: username,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Как звать-то тебя?"
      name="user-info"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
              <input
                type="text"
                className="popup__input popup__input_type_name"
                placeholder="Имя"
                name="user-name"
                required
                minLength="2"
                maxLength="40"
                id="user-name"
                value={username}
                onChange={handleUsernameChange}
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
                value={description}
                onChange={handleDescriptionChange}
              />
              <span className="popup__input-error" id="user-regalia-error"></span>
          </PopupWithForm>
  )
}

export default EditProfilePopup;