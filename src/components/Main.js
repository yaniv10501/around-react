import Card from './Card.js';

export default function Main({
  isLoading,
  user: {
    userName,
    userAvatar,
    userDescription
  },
  cards,
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick
}) {

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
              style={{ backgroundImage: `url(${userAvatar})` }}
            />

          </div>

          <div className="profile__info">

            <h1 className="profile__name" id="name">{userName}</h1>

            <p className="profile__description" id="job">{userDescription}</p>

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
              <Card card={card} key={card._id} onCardClick={onCardClick} />
            ))}

          </ul>

        </section>

      </div>

    </main>
  )

}
