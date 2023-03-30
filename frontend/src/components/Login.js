import React from "react"

function Login(props) {
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
            <h1 className='auth__title'>Вход</h1>
            <form className='auth__form' onSubmit={handleSubmit}>
                <input className='auth__input' type='email' placeholder="Email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                >
                </input>
                <input className='auth__input' type='password' placeholder="Пароль"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                >
                </input>
                <button className='auth__button'>Войти</button>
            </form>
        </div>
    )
}

export default Login