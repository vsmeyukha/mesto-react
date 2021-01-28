import React from 'react';
import api from '../utils/Api';
import Card from './Card';
import currentUserContext from '../contexts/CurrentUserContext';

function Cards(props) {

  const { _id } = React.useContext(currentUserContext);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards()
      .then(data => {
        setCards(data);
      })
      .catch(err => console.error(`Ошибочка вышла - ${err}`));
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === _id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    });
}

  return (
    <section className="cards">
      {cards.map(card => {
        return (
          <Card card={card} key={card._id} onCardClick={props.onCardClick} onLikeClick={() => {handleCardLike(card)}} />
        )
      })}
    </section>
  );
}

export default Cards;