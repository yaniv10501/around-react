import '../App.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { useState } from 'react';

function App() {

  const [selectedCard, setSelectedCard] = useState({
    name: '',
    link: ''
  });

  const [isPopupOpen, setIsPopupOpen] = useState({
    editInfo: false,
    addPlace: false,
    editAvatar: false,
    imagePopup: false
  });

  const handleEditAvatarClick = () => {
    setIsPopupOpen({
      ...isPopupOpen,
      editAvatar: true
    });
  };

  const handleEditProfileClick = () => {
    setIsPopupOpen({
      ...isPopupOpen,
      editInfo: true
    });
  };

  const handleAddPlaceClick = () => {
    setIsPopupOpen({
      ...isPopupOpen,
      addPlace: true
    });
  };

  const handleCardClick = (name, link) => {
    setSelectedCard({
      name: name,
      link: link
    });
    setIsPopupOpen({
      ...isPopupOpen,
      imagePopup: true
    });
  };

  const closeAllPopups = () => {
    setIsPopupOpen({
      editInfo: false,
      addPlace: false,
      editAvatar: false,
      imagePopup: false
    });
    selectedCard.name && setTimeout(() => {
      setSelectedCard({
        name: '',
        link: ''
      });
    }, 300);
  };

  return (
    <div className="page">

      <Header />

      <Main
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
        isOpen={isPopupOpen.editInfo}
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
        ></input>

        <span className="popup__error name-input-error"></span>

        <input
          className="popup__input popup__input_type_about"
          id="about-input"
          type="text"
          placeholder="about me"
          name="job"
          minLength="2"
          maxLength="200"
          required
        ></input>

        <span className="popup__error about-input-error"></span>

      </PopupWithForm>

      <PopupWithForm
        name="edit-picture"
        formName="editPicture"
        formTitle="Change profile picture"
        submitTitle="Save"
        isOpen={isPopupOpen.editAvatar}
        onClose={closeAllPopups}
      >

        <input
          className="popup__input popup__input_type_profile-picture"
          id="profile-picture-input"
          placeholder="profile picture url"
          name="picture"
          type="url"
          required
        ></input>

        <span className="popup__error profile-picture-input-error"></span>

      </PopupWithForm>

      <PopupWithForm
        name="add"
        formName="add"
        formTitle="New Place"
        submitTitle="Create"
        isOpen={isPopupOpen.addPlace}
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
        ></input>

        <span className="popup__error  title-input-error"></span>

        <input
          className="popup__input popup__input_type_url"
          id="url-input"
          type="url"
          placeholder="Image URL"
          name="url"
          required></input>

        <span className="popup__error url-input-error"></span>

      </PopupWithForm>

      <PopupWithForm
        name="delete"
        formName="delete"
        formTitle="Are you sure?"
        submitTitle="Yes"
      />

      <ImagePopup
        isOpen={isPopupOpen.imagePopup}
        selectedCard={selectedCard}
        onClose={closeAllPopups}
      />

    </div>
  );
}

export default App;
