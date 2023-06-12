import { Link } from 'react-router-dom';
import { SignUp } from 'components/SignUp';

const RegisterPage = () => {
    return (
        <div>
            <h1>Register</h1>
            <SignUp/>
            <p>
                У Вас уже есть аккаунт? <Link to="/login">Sign in</Link>
            </p>

        </div>
    )
}

export default RegisterPage