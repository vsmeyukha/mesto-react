import React from 'react';
import api from '../utils/Api';
import Card from './Card';
import currentUserContext from '../contexts/CurrentUserContext';

function Cards(props) {
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

  // ! подписываем компонент Cards на контекст, объявляя переменную, в которую прийдет айдишник юзера
  const { _id } = React.useContext(currentUserContext);

  // ! объявляем функцию лайка/отзыва лайка
  function handleCardLike(card) {

    // ! Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === _id);
    
    // ! Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        // ! Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
        setCards(newCards);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((cardForDeleting) => {
        const cardsWithoutACard = cards.filter((c) => {
          if (c._id !== card._id) {
            return c;
          }
        });
        setCards(cardsWithoutACard);
      })
  }

  return (
    <section className="cards">
      {cards.map(card => {
        return (
          <Card
            card={card}
            key={card._id}
            onCardClick={props.onCardClick}
            onLikeClick={() => {
              handleCardLike(card)
            }}
            onCardDelete={() => {
              handleCardDelete(card)
            }}
          />
        );
      })}
    </section>
  );
}

export default Cards;