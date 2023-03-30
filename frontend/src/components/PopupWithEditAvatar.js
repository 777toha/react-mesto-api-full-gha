import React from 'react';
import PopupWithForm from "./PopupWithForm";

function PopupWithEditAvatar(props) {
    const avatarUseRef = React.useRef('');

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarUseRef.current.value
        });
    }

    return (
        <PopupWithForm
            name='popup_avatar'
            title='Обновить аватар'
            buttonText='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                name='avatar'
                type="url"
                className="popup__input popup__input_avatar-url"
                id="avatar-url"
                placeholder="Ссылка на картинку"
                required
                ref={avatarUseRef}
            />
            <span
                className="popup__input-error avatar-url-error"
            />
        </PopupWithForm>
    )
}

export default PopupWithEditAvatar