import React from "react";
import Card from "./Card";
import CurrentUserContext from "../context/CurrentUserContext";

function Main({ onEditAvatar,
    onEditProfile,
    onAddPlace,
    onCardClick,
    onCardLike,
    onCardDelete,
    cards }) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>

            <section className="profile">
                <div
                    className="profile__avatar"
                    onClick={onEditAvatar}
                    style={{ backgroundImage: `url(${currentUser.avatar})` }}
                >
                </div>
                <div className="profile__info">
                    <div className="profile__container">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button
                            type="button"
                            className="profile__edit-button"
                            onClick={onEditProfile}
                        >
                        </button>
                    </div>
                    <h2 className="profile__subtitle">{currentUser.about}</h2>
                </div>
                <button
                    className="profile__add-button"
                    type="button"
                    onClick={onAddPlace}
                >
                </button>
            </section>

            <section className="elements">
                {cards.map((card) =>
                    <Card
                        key={card._id}
                        cards={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />)}
            </section>
        </main>
    )
};

export default Main;