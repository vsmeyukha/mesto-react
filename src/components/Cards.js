import React from 'react';
import Card from './Card';
import currentUserContext from '../contexts/CurrentUserContext';

function Cards(props) {

  const { _id } = React.useContext(currentUserContext);

  return (
    <section className="cards" >
      {props.cards.map(card => {

        return (

          <Card
            card={card}
            key={card._id}
            onCardClick={props.onCardClick}
            onLikeClick={() => props.onCardLike(card)}
            onCardDelete={() => props.onCardDelete(card)}
          />
        );
      })}
    </section>
  );
}

export default Cards;