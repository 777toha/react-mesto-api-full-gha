import React, { useState, useEffect, useCallback } from 'react'
import Header from "./Header";
import Main from "./Main";
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import PopupWithEditAvatar from "./PopupWithEditAvatar";
import PopupWithEditProfile from './PopupWithEditProfile';
import PopupWithAddPlace from './PopupWithAddPlace';
import api from '../utils/api';
import CurrentUserContext from '../context/CurrentUserContext';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import { login, register, checkAuth } from '../utils/auth';
import PopupRegister from './PopupRegister';
import PopupBorger from './PopupBorger';

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [registerOk, setRegisterOk] = React.useState(false);
    const [borgerPopup, setBorgerPopup] = React.useState(false);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [registerStatus, setRegisterStatus] = React.useState('');

    const navigate = useNavigate();

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditBorgerPopup() {
        setBorgerPopup(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false)
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setBorgerPopup(false)
        setRegisterOk(false)
        setSelectedCard(null)
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function clearToken() {
        localStorage.removeItem('jwt');
    }

    const handleSingIn = useCallback(async (data) => {
        try {
            const { token } = await login(data);
            localStorage.setItem('jwt', token);
            setIsLoggedIn(true);
            navigate('/');
        } catch (err) {
            setIsLoggedIn(false);
            setRegisterOk(true);
            setRegisterStatus('error');
            console.log(`Ошибка.....: ${err}`)
        }
    }, [navigate]);

    const handleSingUp = useCallback(async (data) => {
        try {
            await register(data);
            setRegisterOk(true);
            setRegisterStatus('success');
            navigate('/sing-in');
        } catch (err) {
            setRegisterOk(true);
            setRegisterStatus('error');
            console.log(`Ошибка.....: ${err}`)
        };
    }, [navigate]);

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            checkAuth(jwt).then((data) => {
                setCurrentUser((userData) => ({ ...userData, email: data.data.email }));
                setIsLoggedIn(true);
                navigate('/');
            }).catch(err => console.log(`Ошибка.....: ${err}`));
        }
    }, [navigate])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
            })
            .catch(err => console.log(`Ошибка.....: ${err}`));
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            setCards(cards.filter(item => item !== card))
        })
            .catch(err => console.log(`Ошибка.....: ${err}`));
    }

    function handleUpdateUser(userData) {
        api.sendUserInfo(userData)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка.....: ${err}`))
    }

    function handleUpdateAvatar(userData) {
        api.getUserAvatar(userData)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка.....: ${err}`))
    }

    function handleAddPlaceSubmit(data) {
        api.postCards(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(`Ошибка.....: ${err}`))
    }

    useEffect(() => {
        if (isLoggedIn) {
            Promise.all([
                api.getUserInfo(),
                api.getCards()
            ]).then(([userData, cardData]) => {
                setCurrentUser((prevState) => ({ ...prevState, ...userData }));
                setCards(cardData);
            }).catch(err => console.log(`Ошибка.....: ${err}`));
        }
    }, [isLoggedIn]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">

                <PopupBorger
                    isOpen={borgerPopup}
                    clearToken={clearToken}
                />

                <Header
                    clearToken={clearToken}
                    onClick={handleEditBorgerPopup}
                    status={borgerPopup}
                    onClose={closeAllPopups}
                />

                <Routes>
                    <Route
                        element={<ProtectedRoute isLoggedIn={isLoggedIn} />}
                    >
                        <Route path='/' element={
                            <Main
                                onEditAvatar={handleEditAvatarClick}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                                cards={cards}
                            />} />
                    </Route>
                    <Route path='/sing-in' element={<Login onSubmit={handleSingIn} />} />
                    <Route path='/sing-up' element={<Register onSubmit={handleSingUp} />} />
                </Routes>

                <Footer />

                <PopupWithEditProfile
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <PopupWithAddPlace
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onUpdatePlace={handleAddPlaceSubmit}
                />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

                <PopupWithForm
                    name='confirm-delete'
                    title='Вы уверены?'
                    buttonText='Да'
                />

                <PopupWithEditAvatar
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <PopupRegister
                    isOpen={registerOk}
                    onClose={closeAllPopups}
                    status={registerStatus}
                />

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;