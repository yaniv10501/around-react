import Card from './Card.js';
import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Main({
  isLoading,
  cards,
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onDeleteCardClick,
  onCardClick,
  onCardLike,
}) {

  const currentUser = useContext(CurrentUserContext);

  const { name, about, avatar } = currentUser;

  return (
    <main className="container">

      <div className={isLoading ? "spinner" : "spinner spinner_hidden"}><i></i></div>

      <div className={isLoading ? "content content_hidden" : "content"}>

        <section className="profile">

          <div
            className="profile__edit-pic"
            onClick={onEditAvatarClick}
          >

            <div
              className="profile__pic"
              style={{ backgroundImage: `url(${avatar})` }}
            />

          </div>

          <div className="profile__info">

            <h1 className="profile__name" id="name">{name}</h1>

            <p className="profile__description" id="job">{about}</p>

            <button
              className="profile__edit-button"
              type="button"
              aria-label="Edit profile"
              onClick={onEditProfileClick}
            />

          </div>

          <button
            className="profile__add-button"
            type="button"
            aria-label="Add a picture"
            onClick={onAddPlaceClick}
          />

        </section>

        <section className="photos">

          <ul className="photos__grid">

            {cards.map((card) => (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onLike={onCardLike}
                onDelete={onDeleteCardClick}
              />
            ))}

          </ul>

        </section>

      </div>

    </main>
  )

}
