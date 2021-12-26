import { Link } from 'react-router-dom'

const Header = ({ UserLoggedIn } ) => {
    return (
        <header>
            <Link to = "/" ><p className = 'companyName'>Studio<span>Rent</span></p></Link>
            <Link to = { UserLoggedIn ? "mybookings" : "login"}><h3>{ UserLoggedIn ? "Мои брони" : "Войти" }</h3></Link>
        </header>
    )
}

Header.defaultProps = {
    UserLoggedIn: false,
}

export default Header