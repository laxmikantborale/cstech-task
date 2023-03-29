import '../styles/login.css'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <Link to='/'>
            <div className='login'>
                <div className='container'>
                <h2>Enter your credentials</h2>
                    <form>
                        <input type='text' placeholder='Username' />
                        <input type='password' placeholder='password' />
                        <Link to='/dashboard'><button type='submit'>Login</button></Link>
                    </form>
                </div>
            </div>
        </Link>
    )
}

export default Login