import '../App.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import { useCallback, useEffect, useState } from 'react';
import { api } from '../utils/api.js';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';

function App() {

  const [currentUser, setCurrentUser] = useState({});

  const [selectedCard, setSelectedCard] = useState({
    name: '',
    link: ''
  });

  const [deleteCardId, setDeleteCardId] = useState('');

  const [isEditInfoPopupOpen, setIsEditIntoPopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);

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

  const handleDeleteCardClick = (cardId) => {
    setDeleteCardId(cardId)
    setIsDeleteCardPopupOpen(true);
  }

  const handleCardClick = (name, link) => {
    setSelectedCard({
      name: name,
      link: link
    });
    setIsImagePopupOpen(true);
  };

  const closeAllPopups = useCallback (() => {
    setIsEditAvatarPopupOpen(false);
    setIsEditIntoPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
  }, []);

  const handleUpdateUser = async (name, about) => {

    await api.setUserinfo({ name, about })
      .then(result => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch(err => console.log(err));

  };

  const handleUpdateAvatar = async (avatar) => {

    await api.setUserPicture(avatar)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          avatar: avatar
        });
        closeAllPopups();
      })
      .catch(err => console.log(err));

  };

  const handleAddPlace = async (name, link) => {

    await api.addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));

  }

  const [isLoading, setIsLoading] = useState(true);

  const [cards, setCards] = useState([]);

  const setNewCard = (_id, newCard) => {

    setCards((state) => state.map((card) => card._id === _id ? newCard : card));

  };

  const handleCardLike = (_id, likes) => {

    const isLiked = likes.some(like => like._id === currentUser._id);

    isLiked
      ? api.removeLike(_id)
        .then(newCard => setNewCard(_id, newCard))
        .catch(err => console.log(err))
      : api.addLike(_id)
        .then(newCard => setNewCard(_id, newCard))
        .catch(err => console.log(err));

  };

  const handleCardDelete = async (event) => {

    event.preventDefault();

    await api.deleteCard(deleteCardId)
      .then(() => {
        setCards(state => state.filter(card => card._id === deleteCardId ? false : true));
        closeAllPopups();
      })
      .catch(err => console.log(err));

  };

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getIntialCard()])
      .then(values => {
        setCurrentUser(values[0]);
        setCards(values[1]);
      })
      .then(() => setIsLoading(false))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="page">

      <CurrentUserContext.Provider value={currentUser}>

        <Header />

        <Main
          isLoading={isLoading}
          cards={cards}
          setCards={setCards}
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onDeleteCardClick={handleDeleteCardClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditInfoPopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          selectedCard={selectedCard}
          onClose={closeAllPopups}
        />

      </CurrentUserContext.Provider>

    </div>
  );
}

export default App;
