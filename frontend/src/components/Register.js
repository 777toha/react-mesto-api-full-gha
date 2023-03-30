import React from "react"
import { Link } from "react-router-dom"

function Register(props) {
    const { onSubmit } = props;
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = React.useCallback((e) => {
        e.preventDefault();
        const formData = {
            email,
            password
        };
        onSubmit(formData)

    }, [email, password, onSubmit])

    return (
        <div className='auth'>
            <h1 className='auth__title'>Регистрация</h1>
            <form className='auth__form' onSubmit={handleSubmit}>
                <input
                    className='auth__input'
                    type='email'
                    placeholder="Email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                >
                </input>
                <input
                    className='auth__input'
                    type='password'
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                >
                </input>
                <button className='auth__button'>Зарегистрироваться</button>
                <Link to="/sing-in" className='auth__link'>Уже зарегистрированы? Войти</Link>
            </form>
        </div>
    )
}

export default Register