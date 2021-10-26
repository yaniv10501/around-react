export default function Card(props) {

  const { name, link, likes } = props.card;

  const handleClick = () => {

    props.onCardClick(name, link)

  }

  return (
    <li className="photo">

      <img
        className="photo__image"
        alt={name}
        src={link}
        onClick={handleClick}
      />

      <button className="photo__delete" type="button" aria-label="Delete"></button>

      <div className="photo__info">

        <h2 className="photo__title">{name}</h2>

        <div className="photo__like-container">

          <button className="photo__like" type="button" aria-label="Like"></button>

          <p className="photo__like-count">{likes.length}</p>

        </div>

      </div>

    </li>
  )

}
