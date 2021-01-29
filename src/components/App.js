import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import PopupWithImage from './PopupWithImage';
import api from '../utils/Api';
import currentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';

function App() {

  // ! создаем переменную состояния для задания контекста
  const [currentUser, setCurrentUser] = React.useState({});

  // ! используем эффект, чтобы загрузить с сервера первоначальные данные юзера и записать хи в currentUser
  React.useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUser(data);
      })
      .catch(err => console.error(`Ошибка при получении данных профиля: ${err}`))
  }, []);

  // ! создаем переменные состояния для открытия попапов с формой
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  // ! пишем функции изменения состояния переменных для открытия попапов с формой
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // ! создаем переменную состояния для открытия фотки
  const [selectedCard, setSelectedCard] = React.useState('');

  // ! пишем функцию изменения состояния переменной для открытия попапа с фото
  function handleCardClick(link) {
    setSelectedCard(link);
  }

  // ! пишем функцию закрытия попапа
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard('');
  }

  return (
    // ! оборачиваем все приложение в провайдер контекста
    <currentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
          />
          <Footer />
                
          {/* попап редактирования профиля */}

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
            />

          {/* попап редактирования аватара */}

          {isEditAvatarPopupOpen &&
            <PopupWithForm
              title="Изменить аватар"
              name="change-avatar"
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups} >
                <input
                  type="url"
                  className="popup__input popup__input_type_avatar-link"
                  placeholder="Ссылка на аву"
                  name="avatar-link"
                  required
                  id="avatar-link"
                />
                <span
                  className="popup__input-error"
                  id="avatar-link-error">
                </span>
            </PopupWithForm>
          }

          {/* попап добавления новой карточки */}

          {isAddPlacePopupOpen &&
            <PopupWithForm
              title="Новое место"
              name="add-new-card"
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}>
                <input
                  type="text"
                  className="popup__input popup__input_type_card-title"
                  placeholder="Название картинки"
                  name="card-title"
                  required
                  maxLength="30"
                  id="card-title"
                />
                <span
                  className="popup__input-error"
                  id="card-title-error">
                </span>
                <input
                  type="url"
                  className="popup__input popup__input_type_card-link"
                  placeholder="Ссылка на картинку"
                  name="card-link"
                  required
                  id="card-link"
                />
                <span
                  className="popup__input-error"
                  id="card-link-error">
                </span>
            </PopupWithForm>
          }

          {/* попап подтверждения удаления. его оформим в виде компонента позже */}
          <div className="popup popup_type_submit">

            <div className="popup__container">
              <button className="popup__close-button popup__close-button_type_popup-with-forms" type="button"></button>
              <h3 className="popup__title">Вы уверены?</h3>
              <button type="submit" className="popup__submit" value="Да" name="submit">Да</button>
            </div>

          </div>

          {/* попап с картинкой */}
          {selectedCard &&
            <PopupWithImage
              card={selectedCard}
              onClose={closeAllPopups}
            />
          }

        </div>
      </div>
    </currentUserContext.Provider>
  );
}

export default App;