import React from 'react';
import Profile from './Profile';
import Cards from './Cards';

function Main(props) {

  return (
    <main className="main">
      <Profile onEditProfile={props.onEditProfile} onAddPlace={props.onAddPlace} onEditAvatar={props.onEditAvatar} />
      <Cards onCardClick={props.onCardClick}/>
    </main>
  );
}

export default Main;