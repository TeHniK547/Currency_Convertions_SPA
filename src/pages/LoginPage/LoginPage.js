import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginPage.css'

export const LoginPage = ({ setIsLoggedIn }) => {
    
    const loginRef = useRef();
    const passwordRef = useRef();

    const history = useHistory();

    const hendleSubmit = (e) => {

        e.preventDefault();

        const userData = {
            login: loginRef.current.value,
            password: passwordRef.current.value
        }

        console.log(userData);

        localStorage.setItem('isLoggedIn', true)

        setIsLoggedIn(true);
        history.push('/');
    }
    return(
        <form onSubmit={hendleSubmit} className="LoginForm">
            <h1>Вход</h1>
            <div>
                <input 
                    ref={loginRef} 
                    type="text" 
                    placeholder="Логин" 
                    name="login" 
                    required />
            </div>
            <div>
                <input 
                    ref={passwordRef} 
                    type="password" 
                    placeholder="Пароль" 
                    name="password" 
                    required/>
            </div>
            <div>
                <button type='submit'>
                    Войти
                </button>
            </div>
        </form>
    )
} 