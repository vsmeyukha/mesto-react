import React from 'react';
import currentUserContext from '../contexts/CurrentUserContext';

function Card(props) {

  const { _id } = React.useContext(currentUserContext);

  const isOwn = props.card.owner._id === _id;

  const cardDeleteButtonClassName = (`card__delete-card ${isOwn ? '' : 'card__delete-card_invisible'}`);

  const isLiked = props.card.likes.some(i => i._id === _id);

  const cardLikeButtonClassName = (`card__like-button ${isLiked ? 'card__like-button_active' : ''}`); 

  function handleClick(link) {
    props.onCardClick(link);
  } 

  return (
    <div className="card" >
      <img src={props.card.link} alt="Бали" className="card__img" onClick={() => handleClick(props.card.link) } />
      <button className={cardDeleteButtonClassName}></button>
      <div className="card__name">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like">
          <button className={cardLikeButtonClassName} onClick={props.onLikeClick}></button>
          <p className="card__like-scope">0</p>
        </div>
      </div>
    </div>
  )
}

export default Card;