import {useState, useEffect} from "react";
import {Route, Routes, Navigate, useNavigate} from "react-router-dom";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {api} from "../utils/Api";
import * as accAuth from "../utils/Auth";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setUserEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([
        api.getInitialUserInfo(),
        api.getInitialCards()
      ])
      .then(([data, cards]) => {
        setCurrentUser(data);
        setCards(cards.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    api
    .setUserInfo(data)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api
    .changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => 
        state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  function handleCardDelete(card) {
    api
    .deleteCard(card._id)
    .then(() => {
      setCards((state) => 
        state.filter((c) => c._id !== card._id));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateAvatar(link) {
    api
    .updateAvatar(link)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleAddPlaceSubmit(data) {
    api
    .addNewCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleLogin(email, password) {
    accAuth.login(email, password)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        setUserEmail(email);
        setLoggedIn(true);
        navigate("/", { replace: true });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleRegister(email, password) {
    accAuth.register(email, password)
    .then(() => {
      setIsSuccess(true);
      navigate("/sign-in", { replace: true });
    })
    .catch((err) => {
      setIsSuccess(false);
      console.log(err);
    })
    .finally(() => {
      setIsInfoTooltipOpen(true);
    });
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      accAuth.checkToken(jwt)
      .then((user) => {
        setUserEmail(user.email);
        setLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      });
    }
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/sign-in");
    setUserEmail("");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onSignOut={onSignOut} userEmail={email} />
        <Routes>
          <Route path="/" element={<ProtectedRoute element={Main} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} loggedIn={loggedIn} cards={cards}/>} />
          <Route path="/sign-in" element={<Login loggedIn={loggedIn} handleLogin={handleLogin} />} />
          <Route path="/sign-up" element={<Register handleRegister={handleRegister} />} />
          <Route path="*" element={<Navigate to={loggedIn ? "/" : "/sign-in"}/>} />
        </Routes>
        <Footer />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isSuccess={isSuccess} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;