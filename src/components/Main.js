import { useEffect, useState } from 'react';
import { api } from '../utils/api.js';
import Card from './Card.js';

export default function Main(props) {

  const [isLoading, setIsLoading] = useState(true);

  const [cards, setCards] = useState([]);

  const [userInfo, setUserInfo] = useState({
    userName: '',
    userDescription: '',
    userAvatar: '',
  });

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getIntialCard()])
      .then(values => {
        setUserInfo({
          userName: values[0].name,
          userDescription: values[0].about,
          userAvatar: values[0].avatar,
        });
        setCards(values[1]);
      })
      .then(() => setIsLoading(false))
      .catch(err => console.log(err));
  }, []);

  return (
    <main className="container">

      <div className={isLoading ? "spinner" : "spinner spinner_hidden"}><i></i></div>

      <div className={isLoading ? "content content_hidden" : "content"}>

        <section className="profile">

          <div
            className="profile__edit-pic"
            onClick={props.onEditAvatarClick}
          >

            <div
              className="profile__pic"
              style={{ backgroundImage: `url(${userInfo.userAvatar})` }}
              ></div>

          </div>

          <div className="profile__info">

            <h1 className="profile__name" id="name">{userInfo.userName}</h1>

            <p className="profile__description" id="job">{userInfo.userDescription}</p>

            <button
              className="profile__edit-button"
              type="button"
              ariaLabel="Edit profile"
              onClick={props.onEditProfileClick}
            ></button>

          </div>

          <button
            className="profile__add-button"
            type="button"
            ariaLabel="Add a picture"
            onClick={props.onAddPlaceClick}
          ></button>

        </section>

        <section className="photos">

          <ul className="photos__grid">

            {cards.map((card) => (
                  <Card card={card} onCardClick={props.onCardClick} />
            ))}

          </ul>

        </section>

      </div>

    </main>
  )

}
