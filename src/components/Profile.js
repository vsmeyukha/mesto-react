import React from 'react';
import cousteau from '../images/cousteau.jpg';
import pencil from '../images/pencil.svg';
import plus from '../images/plus.svg';
import api from '../utils/Api';


function Profile(props) {
  // ! создаем переменные состояния для имени пользователя, описания и аватара
  const [userName, setUserName] = React.useState('Владимир Соловьев');
  const [userRegalia, setUserRegalia] = React.useState('работник склада грязи');
  const [userAvatar, setUserAvatar] = React.useState(cousteau);

  // ! прописываем первичную загрузку данных пользователя
  React.useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setUserName(data.name);
        setUserRegalia(data.about);
        setUserAvatar(data.avatar);
      })
      .catch(err => console.error(`Ошибка при редактировании профиля: ${err}`))
  });


  return (
    <section className="profile">

      <div className="profile__avatar">
        <button className="profile__avatar-button" onClick={props.onEditAvatar}>
          <img src={pencil} alt="карандаш" className="profile__avatar-pencil" />
        </button>
        <img src={userAvatar} alt="Аватар пользователя" className="profile__avatar-image" />
      </div>

      <h1 className="profile__name">{ userName }</h1>
      <p className="profile__regalia">{ userRegalia }</p>

      <button className="profile__edit-button" onClick={props.onEditProfile}>
        <img src={pencil} alt="карандаш" className="profile__pencil" />
      </button>

      <button className="profile__add-button" onClick={props.onAddPlace}>
        <img src={plus} alt="плюс" className="profile__plus" />
      </button>

    </section>
  );
}

export default Profile;