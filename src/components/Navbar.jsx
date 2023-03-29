import '../styles/navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar'>
            <nav>
                <div className='left'>
                    <h2 className='logo'>CS TECH</h2>
                    <h2>Home</h2>
                </div>
                <div className='centre'>
                    <Link to='/employeelist'><h2>Eployeelist</h2></Link>
                </div>
                <div className='right'>
                    <h2>Name</h2>
                   <Link to='/'> <h2>Logout</h2></Link>
                </div>
            </nav>
        </div>
    )
}

export default Navbar