import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../context/CurrentUserContext";

function PopupWithEditProfile(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name='popup_profile'
      title='Редактировать профиль'
      buttonText='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_data_name"
        placeholder="Имя"
        name="name"
        type="text"
        id="profile-name"
        minLength="2"
        maxLength="40"
        pattern="^[a-zA-Zа-яА-я-\s]+$"
        required
        value={name}
        onChange={handleNameChange}
      />
      <span
        className="popup__input-error profile-name-error"
      />
      <input
        className="popup__input popup__input_data_profession"
        name="job"
        placeholder="Профессия"
        type="text"
        id="profile-profession"
        minLength="2"
        maxLength="200"
        pattern="^[a-zA-Zа-яА-я-\s]+$"
        required
        value={description}
        onChange={handleDescriptionChange}
      />
      <span
        className="popup__input-error profile-profession-error"
      />
    </PopupWithForm>
  )
}

export default PopupWithEditProfile