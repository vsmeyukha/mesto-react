import React from 'react';
import api from '../utils/Api';
import Card from './Card';

function Cards(props) {
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards()
      .then(data => {
        setCards(data);
      })
      .catch(err => console.error(`Ошибочка вышла - ${err}`));
  }, [cards]);

  return (
    <section className="cards">
      {cards.map(card => {
        return (
          <Card card={card} key={card._id} onCardClick={props.onCardClick} />
        )
      })}
    </section>
  );
}

export default Cards;