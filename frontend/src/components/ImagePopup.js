function ImagePopup(props) {
    return (
        <section className={`popup popup_zoom-image ${props.card ? 'popup_opened' : ''}`}>
            <figure className="popup__figure popup__overlay">
                <img
                    src={props.card?.link}
                    className="popup__image"
                    alt={props.card ? props.card.name : ''} />
                <figcaption className="popup__caption">
                    {props.card ? props.card.name : ''}
                </figcaption>
                <button
                    type="button"
                    className="popup__close"
                    onClick={props.onClose}
                ></button>
            </figure>
        </section>
    )
}

export default ImagePopup