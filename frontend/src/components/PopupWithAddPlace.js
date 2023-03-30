import React from "react"
import PopupWithForm from "./PopupWithForm"

function PopupWithAddPlace(props) {
    const namePlaceRef = React.useRef({});
    const linkPlaceRef = React.useRef({});

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdatePlace({
            name: namePlaceRef.current.value,
            link: linkPlaceRef.current.value
        })
    }
    return (
        <PopupWithForm
            name='popup_card-add'
            title='Новое место'
            buttonText='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_data_name"
                placeholder="Название"
                type="text"
                name="name"
                id="card-add-name"
                minLength="2"
                maxLength="30"
                pattern="^[a-zA-Zа-яА-я-\s]+$"
                required
                ref={namePlaceRef}
            />
            <span
                className="popup__input-error card-add-name-error"
            />
            <input
                className="popup__input popup__input_data_profession"
                placeholder="Ссылка на картинку"
                type="url"
                name="url"
                id="card-add-url"
                required
                ref={linkPlaceRef}
            />
            <span
                className="popup__input-error card-add-url-error"
            />
        </PopupWithForm>
    )
}

export default PopupWithAddPlace