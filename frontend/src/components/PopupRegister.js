import Union_true from '../image/Union_true.png';
import Union_false from '../image/Union_false.png';

function PopupRegister(props) {
    const { isOpen, onClose, status } = props;
    return (
        <section className={`popup popup_register ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__overlay">
                <button className="popup__close" type="button" onClick={onClose} />
                <img className="popup__img" alt='результат' src={status !== 'error' ? Union_true : Union_false} />
                <h2 className="popup__subtitle">{status !== 'error' ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
            </div>
        </section>
    )
}

export default PopupRegister