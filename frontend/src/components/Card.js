import React from "react";
import CurrentUserContext from "../context/CurrentUserContext";

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.cards.owner._id === currentUser._id;
    const isLiked = props.cards.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `element__like-button ${isLiked && 'element__like-button_active'}`
    );

    function handleCardClick() {
        props.onCardClick(props.cards);
    }

    function handleLikeClick() {
        props.onCardLike(props.cards)
    }

    function handleCardDelete() {
        props.onCardDelete(props.cards)
    }

    return (
        <div id="element-template">
            <div className="element">
                {isOwn && <button className="element__trash" type="button" onClick={handleCardDelete} />}
                <img
                    className="element__image"
                    src={props.cards.link}
                    alt={props.cards.name}
                    onClick={handleCardClick}
                />
                <div className="element__container">
                    <h2 className="element__title">{props.cards.name}</h2>
                    <div className="element__like">
                        <button
                            className={cardLikeButtonClassName}
                            type="button"
                            onClick={handleLikeClick}
                        ></button>
                        <p className="element__counter-like">{props.cards.likes.length}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card