import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithImage from './PopupWithImage';
import api from '../utils/Api';
import currentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

  // ! создаем переменную состояния для задания контекста
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: '',
    _id: ''
  });

  // ! используем эффект, чтобы загрузить с сервера первоначальные данные юзера и записать хи в currentUser
  React.useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUser(data);
      })
      .catch(err => console.error(`Ошибка при получении данных профиля: ${err}`))
  }, []);

    // ! объявляем переменную состояния, в которую будет приходить массив карточек
    const [cards, setCards] = React.useState([]);

    // ! при монтировании элемента в переменную cards из API приходит массив карточек
    React.useEffect(() => {
      api.getInitialCards()
        .then(data => {
          setCards(data);
        })
        .catch(err => console.error(`Ошибочка вышла - ${err}`));
    }, []);
  
    // ! объявляем функцию лайка/отзыва лайка
    function handleCardLike(card) {

      // ! Снова проверяем, есть ли уже лайк на этой карточке
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      
      // ! Отправляем запрос в API и получаем обновлённые данные карточки
      api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
          // ! Формируем новый массив на основе имеющегося, подставляя в него новую карточку
          const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        // Обновляем стейт
          setCards(newCards);
        })
        .catch(err => console.error(`Ошибка добавления лайка: ${err}`))
    }
  
    function handleCardDelete(card) {
      api.deleteCard(card._id)
        .then((cardForDeleting) => {
          const cardsWithoutACard = cards.filter((c) => {
            if (c._id !== card._id) {
              return c;
            }
          })
          setCards(cardsWithoutACard);
        })
        .catch(err => console.error(`Ошибка удаления карточки: ${err}`))
    }

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
  const [selectedCard, setSelectedCard] = React.useState(null);

  // ! пишем функцию изменения состояния переменной для открытия попапа с фото
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // ! пишем функцию закрытия попапа
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  // ! функция обновления данных профиля
  function handleUpdateUser(currentUser) {
    api.editProfile(currentUser)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.error(`Ошибка при редактировании данных профиля: ${err}`));
  }

  function handleUpdateAvatar(currentUser) {
    api.changeAvatar(currentUser)
      .then(data => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.error(`Ошибка при редактировании аватара: ${err}`));
  }

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
      .then(data => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.error(`Ошибка при добавлении изображения: ${err}`));
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
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
                
          {/* попап редактирования профиля */}

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

          {/* попап редактирования аватара */}

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          {/* попап добавления новой карточки */}

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

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