import React from 'react';
import PopupWithForm from './PopupWithForm';
import currentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  // ! объявляем стейт-переменные, которые будут привязаны к полям ввода формы и сделают их управляемыми
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // ! подписываем компонент на контекст
  const currentUser = React.useContext(currentUserContext);
  console.log(currentUser);

  // ! После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  // ! функция изменения значения инпута имени
  function handleNameChange(e) {
    setName(e.target.value);
  }

    // ! функция изменения значения инпута описания
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
            title="Как звать-то тебя?"
            name="user-info"
            isOpen={props.isOpen}
            onClose={props.onClose}>
              <input
                type="text"
                className="popup__input popup__input_type_name"
                placeholder="Имя"
                name="user-name"
                required
                minLength="2"
                maxLength="40"
                id="user-name"
                value={name}
                onChange={handleNameChange}
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