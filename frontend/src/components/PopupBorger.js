import React from "react"
import { Link } from "react-router-dom"
import CurrentUserContext from "../context/CurrentUserContext"

function PopupBorger(props) {
    const { clearToken, isOpen } = props;
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <div className={`header__popup ${isOpen ? 'header_opened' : ''}`}>
            <div className='header__popup_subtitle'>{currentUser.email}</div>
            <Link to='/sing-in' className='header__popup_link' onClick={clearToken}>Выйти</Link>
        </div>
    )
}

export default PopupBorger