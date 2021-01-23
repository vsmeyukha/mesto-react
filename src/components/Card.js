import React from 'react';

function Card(props) {

  function handleClick(link) {
    props.onCardClick(link);
  } 

  return (
    <div className="card" >
      <img src={props.card.link} alt="Бали" className="card__img" onClick={() => handleClick(props.card.link) } />
      <button className="card__delete-card"></button>
      <div className="card__name">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like">
          <button className="card__like-button"></button>
          <p className="card__like-scope">0</p>
        </div>
      </div>
    </div>
  )
}

export default Card;