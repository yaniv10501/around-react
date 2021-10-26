import '../App.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { useEffect, useState } from 'react';
import { api } from '../utils/api.js';

function App() {

  const [selectedCard, setSelectedCard] = useState({
    name: '',
    link: ''
  });

  const [isEditInfoPopupOpen, setIsEditIntoPopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditIntoPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (name, link) => {
    setSelectedCard({
      name: name,
      link: link
    });
    setIsImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditIntoPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  };

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
    <div className="page">

      <Header />

      <Main
        isLoading={isLoading}
        user={userInfo}
        cards={cards}
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <PopupWithForm
        name="edit-info"
        formName="editInfo"
        formTitle="Edit profile"
        submitTitle="Save"
        isOpen={isEditInfoPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input popup__input_type_name"
          id="name-input"
          type="text"
          placeholder="name"
          name="name"
          minLength="2"
          maxLength="40"
          required
        />

        <span className="popup__error name-input-error" />

        <input
          className="popup__input popup__input_type_about"
          id="about-input"
          type="text"
          placeholder="about me"
          name="job"
          minLength="2"
          maxLength="200"
          required
        />

        <span className="popup__error about-input-error" />

      </PopupWithForm>

      <PopupWithForm
        name="edit-picture"
        formName="editPicture"
        formTitle="Change profile picture"
        submitTitle="Save"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >

        <input
          className="popup__input popup__input_type_profile-picture"
          id="profile-picture-input"
          placeholder="profile picture url"
          name="picture"
          type="url"
          required
        />

        <span className="popup__error profile-picture-input-error" />

      </PopupWithForm>

      <PopupWithForm
        name="add"
        formName="add"
        formTitle="New Place"
        submitTitle="Create"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >

        <input
          className="popup__input popup__input_type_title"
          id="title-input"
          type="text"
          placeholder="Title"
          name="title"
          minLength="2"
          maxLength="30"
          required
        />

        <span className="popup__error  title-input-error" />

        <input
          className="popup__input popup__input_type_url"
          id="url-input"
          type="url"
          placeholder="Image URL"
          name="url"
          required
        />

        <span className="popup__error url-input-error" />

      </PopupWithForm>

      <PopupWithForm
        name="delete"
        formName="delete"
        formTitle="Are you sure?"
        submitTitle="Yes"
      />

      <ImagePopup
        isOpen={isImagePopupOpen}
        selectedCard={selectedCard}
        onClose={closeAllPopups}
      />

    </div>
  );
}

export default App;
