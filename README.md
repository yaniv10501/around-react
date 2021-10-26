# Project 10: Around The U.S. React

The 10th project of my journey of becoming a front-end developer.

[Link to the page](https://yaniv10501.github.io/around-react/)

## Description

This project is an implementation of my [4th Project (git repo)](https://github.com/yaniv10501/web_project_4) in React.

In this React app i used function components with state and effect hooks.

### Overview

* **React Components**

* **Use State Hooks**

* **Use Effect Hooks**

### React Components

App consists of five React Components -

* Header

* Main

* Footer

* PopupWithForm

* ImagePopup

**Main**

In the Main Component photo grid list there is a map method to return an array of Card Components, each card is an image fetched from the API along with the user information

```jsx
import { api } from '../utils/api.js';

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
```

```jsx
<ul className="photos__grid">

  {cards.map((card) => (
    <Card card={card} onCardClick={props.onCardClick} />
  ))}

</ul>
```

Each Card Component have 4 props which are destructured from each card item -

```jsx
const { _id, name, link, likes } = props.card;
```

The name and the link of each card is stored in the handleClick method and get passed to the image popup on click -

```jsx
const handleClick = () => {

  props.onCardClick(name, link)

}
```

The handleClick method is declared in the App Component, and get passed as a prop to the Main component and then to the Card Component.

```jsx
return (
  <div className="page">

    <Header />

    <Main
      onEditProfileClick={handleEditProfileClick}
      onAddPlaceClick={handleAddPlaceClick}
      onEditAvatarClick={handleEditAvatarClick}
      onCardClick={handleCardClick}
    />
```

```jsx
<Card card={card} onCardClick={props.onCardClick} />
```

**PopupWithForm**

The PopupWithForm Component is used four times in the App Component to make the edit user info form, the add user avatar form, the add place card form and the delete place card form.

```jsx
<PopupWithForm
        name="edit-info"
        formName="editInfo"
        formTitle="Edit profile"
        submitTitle="Save"
        isOpen={isPopupOpen.editInfo}
        onClose={closeAllPopups}
      >

<PopupWithForm
        name="edit-picture"
        formName="editPicture"
        formTitle="Change profile picture"
        submitTitle="Save"
        isOpen={isPopupOpen.editAvatar}
        onClose={closeAllPopups}
      >

<PopupWithForm
        name="add"
        formName="add"
        formTitle="New Place"
        submitTitle="Create"
        isOpen={isPopupOpen.addPlace}
        onClose={closeAllPopups}
      >

<PopupWithForm
        name="delete"
        formName="delete"
        formTitle="Are you sure?"
        submitTitle="Yes"
      />
```

The PopupWithForm Component also accepts children props, the children props are used for the different inputs for each form element.

The PopupWithForm Component get the isOpen prop from the App Component, the isOpen prop is a state which control the visibility of the form

```jsx
<div
      className={
        props.isOpen
          ? `popup popup_type_${props.name} popup_opened`
          : `popup popup_type_${props.name}`
      }>
```

### Use State Hooks

In the App Component there are sevral useState Hooks

```jsx
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
```

isPopupOpen state is an object that gets destructured every time a popup is opened and force close all popups when a popup is closed

```jsx
const handleAddPlaceClick = () => {
    setIsPopupOpen({
      ...isPopupOpen,
      addPlace: true
    });
  };

const closeAllPopups = () => {
    setIsPopupOpen({
      editInfo: false,
      addPlace: false,
      editAvatar: false,
      imagePopup: false
    });
```

The selectedCard state is set each time a card is clicked with the name and link from the Card Component.
when the popup close if the selectedCard object has a name (which means an image popup is open), the state of the selectedCard is set to empty string after a timeout to prevent animation glitch.

```jsx
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
    selectedCard.name && setTimeout(() => {
      setSelectedCard({
        name: '',
        link: ''
      });
    }, 300);
  };
```

There are also states in the Main Component -

```jsx
const [isLoading, setIsLoading] = useState(true);

  const [cards, setCards] = useState([]);

  const [userInfo, setUserInfo] = useState({
    userName: '',
    userDescription: '',
    userAvatar: '',
  });
```

The isLoading state is used the toggle the Main Compnent loading spinner while page is loading

```jsx
<div className={isLoading ? "spinner" : "spinner spinner_hidden"}><i></i></div>

<div className={isLoading ? "content content_hidden" : "content"}>
```

The cards and userInfo states are used for the website content

```jsx
<div className="profile__info">

  <h1 className="profile__name" id="name">{userInfo.userName}</h1>

  <p className="profile__description" id="job">{userInfo.userDescription}</p>
```

### Use Effect Hooks

The useEffect Hook is used in the Main Compnent to fetch the website data from the api and set the states of the userInfo and cards, and then set the isLoading state to false

```jsx
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
```

Promise.all used to wrap both fetches under one promise and then set the isLoading state.
An empty array is a passed to the useEffect hook so it won't run again after mount.
