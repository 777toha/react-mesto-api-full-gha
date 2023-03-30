import logo from '../image/logo_header.svg';
import Borger from '../image/Borger.png';
import BorgerClose from '../image/BorgerClose.png'
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import CurrentUserContext from '../context/CurrentUserContext';

function Header(props) {
    const { clearToken, onClick, status, onClose } = props;
    const currentUser = React.useContext(CurrentUserContext);

    function handleMove() {
        if (status === true) {
            onClose()
        } else {
            onClick()
        }
    }

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="место" name="avatar" />
            <Routes>
                <Route path='/sing-up' element={<Link className='header__link' to='/sing-in'>Войти</Link>} />
                <Route path='/sing-in' element={<Link className='header__link' to='/sing-up'>Зарегистрироваться</Link>} />
                <Route path='/'
                    element={
                        <div>
                            <div className='header__link_login'>
                                <div className='header__subtitle'>{currentUser.email}</div>
                                <Link to='/sing-in' className='header__link_in' onClick={clearToken}>Выйти</Link>
                            </div>
                            <img className='header__borger' src={`${status ? BorgerClose : Borger}`} onClick={handleMove} />
                        </div>
                    } />
            </Routes>
        </header>
    )
}

export default Header