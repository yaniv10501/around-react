import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Card({
  card: { _id, name, link, owner, likes },
  onCardClick,
  onLike,
  onDelete
}) {

  const currentUser = useContext(CurrentUserContext);

  const isOwn = owner._id === currentUser._id;

  const cardDeleteButtonClassName = (
    `photo__delete ${!isOwn && 'photo__delete_hidden'}`
  );

  const isLiked = likes.some(like => like._id === currentUser._id);

  const cardLikeButtonClassName = `photo__like ${isLiked && 'photo__like_active'}`;

  const handleClick = () => {

    onCardClick(name, link)

  }

  const handleLikeClick = () => {

    onLike(_id, likes);

  }

  const handleDeleteClick = () => {

    onDelete(_id);

  }

  return (
    <li className="photo">

      <img
        className="photo__image"
        alt={name}
        src={link}
        onClick={handleClick}
      />

      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Delete"
        onClick={handleDeleteClick}
         />

      <div className="photo__info">

        <h2 className="photo__title">{name}</h2>

        <div className="photo__like-container">

          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Like"
            onClick={handleLikeClick}
            />

          <p className="photo__like-count">{likes.length}</p>

        </div>

      </div>

    </li>
  )

}
